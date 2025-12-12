import { storage } from "../storage";
import type { InsertEnvironmentalData, InsertReport } from "@shared/schema";

class DataService {
  private isPolling = false;

  async syncAllData(userId?: string) {
    if (this.isPolling) return;
    
    this.isPolling = true;
    
    try {
      await Promise.all([
        this.syncNASAData(),
        this.syncWorldBankData(),
        this.syncNOAAData(),
        this.syncOpenAQData(),
      ]);
      
      await this.updateDataSourceStatuses();
      
      if (userId) {
        await this.checkCustomAlerts(userId);
      }
    } catch (error) {
      console.error("Error syncing data:", error);
    } finally {
      this.isPolling = false;
    }
  }

  private async syncNASAData() {
    try {
      const apiKey = process.env.NASA_API_KEY || process.env.NASA_API_KEY_ENV_VAR || "DEMO_KEY";
      
      // NASA MODIS Fire data
      const fireResponse = await fetch(
        `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${apiKey}/MODIS_NRT/BRA/1`
      );
      
      if (fireResponse.ok) {
        const fireData = await fireResponse.text();
        await this.processFireData(fireData);
        await storage.updateDataSourceStatus('NASA MODIS', 'active', null);
      } else {
        throw new Error(`NASA API error: ${fireResponse.status}`);
      }
    } catch (error) {
      console.error("Error syncing NASA data:", error);
      await storage.updateDataSourceStatus('NASA MODIS', 'error', error.message);
    }
  }

  private async syncWorldBankData() {
    try {
      // World Bank Climate Change Knowledge Portal
      const response = await fetch(
        'https://climateknowledgeportal.worldbank.org/api/v1/country/BRA/variable/tas'
      );
      
      if (response.ok) {
        const climateData = await response.json();
        await this.processClimateData(climateData);
        await storage.updateDataSourceStatus('World Bank API', 'active', null);
      } else {
        throw new Error(`World Bank API error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error syncing World Bank data:", error);
      await storage.updateDataSourceStatus('World Bank API', 'error', error.message);
    }
  }

  private async syncNOAAData() {
    try {
      const apiKey = process.env.NOAA_API_KEY || process.env.NOAA_API_KEY_ENV_VAR;
      
      if (!apiKey) {
        await storage.updateDataSourceStatus('NOAA Climate', 'delayed', 'API key not configured');
        return;
      }
      
      const response = await fetch(
        `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GSOM&locationid=COUNTRY:BR&startdate=2024-01-01&enddate=2024-12-31`,
        {
          headers: {
            'token': apiKey
          }
        }
      );
      
      if (response.ok) {
        const noaaData = await response.json();
        await this.processNOAAData(noaaData);
        await storage.updateDataSourceStatus('NOAA Climate', 'active', null);
      } else {
        throw new Error(`NOAA API error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error syncing NOAA data:", error);
      await storage.updateDataSourceStatus('NOAA Climate', 'error', error.message);
    }
  }

  private async syncOpenAQData() {
    try {
      const response = await fetch(
        'https://api.openaq.org/v2/latest?limit=100&parameter[]=pm25&parameter[]=pm10&parameter[]=o3&parameter[]=no2'
      );
      
      if (response.ok) {
        const airQualityData = await response.json();
        await this.processAirQualityData(airQualityData);
        await storage.updateDataSourceStatus('OpenAQ', 'active', null);
      } else {
        throw new Error(`OpenAQ API error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error syncing OpenAQ data:", error);
      await storage.updateDataSourceStatus('OpenAQ', 'error', error.message);
    }
  }

  private async processFireData(csvData: string) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < Math.min(lines.length, 100); i++) {
      const values = lines[i].split(',');
      if (values.length >= headers.length) {
        const environmentalData: InsertEnvironmentalData = {
          dataType: 'deforestation',
          region: 'south-america',
          value: parseFloat(values[8]) || 0, // confidence
          unit: 'confidence_percentage',
          source: 'NASA',
          metadata: {
            latitude: parseFloat(values[0]),
            longitude: parseFloat(values[1]),
            brightness: parseFloat(values[2]),
            scan: parseFloat(values[3]),
            track: parseFloat(values[4]),
            acq_date: values[5],
            acq_time: values[6],
            satellite: values[7],
            instrument: values[9],
            version: values[10]
          }
        };
        
        await storage.createEnvironmentalData(environmentalData);
      }
    }
  }

  private async processClimateData(data: any) {
    if (data && data.length > 0) {
      for (const item of data.slice(0, 10)) {
        const environmentalData: InsertEnvironmentalData = {
          dataType: 'temperature',
          region: 'south-america',
          value: parseFloat(item.value) || 0,
          unit: 'celsius',
          source: 'World Bank',
          metadata: {
            country: item.country,
            indicator: item.indicator,
            year: item.year
          }
        };
        
        await storage.createEnvironmentalData(environmentalData);
      }
    }
  }

  private async processNOAAData(data: any) {
    if (data && data.results) {
      for (const item of data.results.slice(0, 20)) {
        const environmentalData: InsertEnvironmentalData = {
          dataType: 'climate',
          region: 'south-america',
          value: parseFloat(item.value) || 0,
          unit: item.attributes?.units || 'unknown',
          source: 'NOAA',
          metadata: {
            datatype: item.datatype,
            station: item.station,
            date: item.date
          }
        };
        
        await storage.createEnvironmentalData(environmentalData);
      }
    }
  }

  private async processAirQualityData(data: any) {
    if (data && data.results) {
      for (const item of data.results.slice(0, 50)) {
        for (const measurement of item.measurements) {
          const environmentalData: InsertEnvironmentalData = {
            dataType: 'air_quality',
            region: this.getRegionFromCountry(item.country),
            value: parseFloat(measurement.value) || 0,
            unit: measurement.unit,
            source: 'OpenAQ',
            metadata: {
              city: item.city,
              country: item.country,
              parameter: measurement.parameter,
              lastUpdated: measurement.lastUpdated,
              coordinates: item.coordinates
            }
          };
          
          await storage.createEnvironmentalData(environmentalData);
        }
      }
    }
  }

  private async updateDataSourceStatuses() {
    // This method updates the overall status based on recent sync results
    const sources = ['NASA MODIS', 'World Bank API', 'NOAA Climate', 'OpenAQ'];
    
    for (const source of sources) {
      const status = await storage.getDataSourceStatus(source);
      if (!status) {
        await storage.updateDataSourceStatus(source, 'active', null);
      }
    }
  }

  private async checkCustomAlerts(userId: string) {
    const customAlerts = await storage.getUserCustomAlerts(userId);
    const latestData = await storage.getLatestEnvironmentalData({});
    
    for (const alert of customAlerts.filter(a => a.isActive)) {
      const relevantData = latestData.filter(d => 
        d.dataType === alert.dataType && 
        (!alert.region || d.region === alert.region)
      );
      
      for (const data of relevantData) {
        const value = parseFloat(data.value);
        const threshold = parseFloat(alert.threshold);
        let triggered = false;
        
        switch (alert.condition) {
          case '>':
            triggered = value > threshold;
            break;
          case '<':
            triggered = value < threshold;
            break;
          case '>=':
            triggered = value >= threshold;
            break;
          case '<=':
            triggered = value <= threshold;
            break;
          case '==':
            triggered = Math.abs(value - threshold) < 0.01;
            break;
        }
        
        if (triggered) {
          await storage.createAlert({
            userId,
            type: 'warning',
            title: `Custom Alert: ${alert.name}`,
            description: `${alert.dataType} value ${value} ${alert.condition} ${threshold} in ${data.region}`,
            region: data.region
          });
        }
      }
    }
  }

  async generateReport(reportId: number, reportData: InsertReport) {
    try {
      await storage.updateReportStatus(reportId, 'pending');
      
      // Simulate report generation time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const data = await storage.getEnvironmentalData({
        dataType: reportData.parameters?.dataType,
        region: reportData.parameters?.region,
        startDate: reportData.parameters?.startDate ? new Date(reportData.parameters.startDate) : undefined,
        endDate: reportData.parameters?.endDate ? new Date(reportData.parameters.endDate) : undefined,
      });
      
      const fileName = `report_${reportId}_${Date.now()}.${reportData.type}`;
      
      // In a real implementation, generate actual file
      await storage.updateReportStatus(reportId, 'completed', fileName, new Date());
      
    } catch (error) {
      console.error("Error generating report:", error);
      await storage.updateReportStatus(reportId, 'failed');
    }
  }

  private getRegionFromCountry(country: string): string {
    const regionMap: { [key: string]: string } = {
      'US': 'north-america',
      'CA': 'north-america',
      'MX': 'north-america',
      'BR': 'south-america',
      'AR': 'south-america',
      'CL': 'south-america',
      'CN': 'asia',
      'IN': 'asia',
      'JP': 'asia',
      'DE': 'europe',
      'FR': 'europe',
      'GB': 'europe',
      'AU': 'oceania',
      'NZ': 'oceania',
      'NG': 'africa',
      'ZA': 'africa',
      'EG': 'africa'
    };
    
    return regionMap[country] || 'global';
  }

  startAutoSync() {
    // Auto-sync every 5 minutes
    setInterval(() => {
      this.syncAllData().catch(console.error);
    }, 5 * 60 * 1000);
    
    // Initial sync
    this.syncAllData().catch(console.error);
  }
}

export const dataService = new DataService();
