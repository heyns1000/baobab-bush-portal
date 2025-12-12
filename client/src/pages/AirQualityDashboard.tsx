import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function AirQualityDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: airQualityData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'air_quality', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for air quality monitoring
  const pm25Data = [
    { label: 'Jan', value: 25.4 },
    { label: 'Feb', value: 23.8 },
    { label: 'Mar', value: 26.2 },
    { label: 'Apr', value: 24.7 },
    { label: 'May', value: 27.3 },
    { label: 'Jun', value: 29.1 },
    { label: 'Jul', value: 31.5 },
    { label: 'Aug', value: 30.2 },
    { label: 'Sep', value: 28.6 },
    { label: 'Oct', value: 26.8 },
    { label: 'Nov', value: 25.1 },
    { label: 'Dec', value: 24.3 }
  ];

  const pollutionHotspotsData = [
    { label: 'Delhi', value: 153 },
    { label: 'Beijing', value: 142 },
    { label: 'Lahore', value: 138 },
    { label: 'Mumbai', value: 127 },
    { label: 'Dhaka', value: 121 },
    { label: 'Karachi', value: 115 }
  ];

  const pollutionSourcesData = [
    { label: 'Vehicle Emissions', value: 35, color: '#dc2626' },
    { label: 'Industrial Activities', value: 28, color: '#ea580c' },
    { label: 'Coal Burning', value: 20, color: '#d97706' },
    { label: 'Agriculture', value: 12, color: '#ca8a04' },
    { label: 'Other', value: 5, color: '#65a30d' }
  ];

  const aqiTrendsData = [
    { label: 'India', value: 141 },
    { label: 'China', value: 98 },
    { label: 'Pakistan', value: 156 },
    { label: 'Bangladesh', value: 164 },
    { label: 'Mongolia', value: 128 },
    { label: 'Afghanistan', value: 145 }
  ];

  const healthImpactData = [
    { label: '2020', value: 6.7 },
    { label: '2021', value: 7.1 },
    { label: '2022', value: 6.9 },
    { label: '2023', value: 7.3 },
    { label: '2024', value: 7.0 }
  ];

  const aiForecastData = [
    { label: 'Jan', value: 87.2 },
    { label: 'Feb', value: 89.1 },
    { label: 'Mar', value: 91.3 },
    { label: 'Apr', value: 93.7 },
    { label: 'May', value: 94.2 },
    { label: 'Jun', value: 95.8 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="air-quality"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Air Quality Monitoring Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tracking air pollution, its sources, and health impacts worldwide.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="border-none focus:ring-0 text-sm max-w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Continents</SelectItem>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                  <SelectItem value="Oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* PM2.5 Concentration */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global PM2.5 Concentration
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={pm25Data}
                  dataSource="WHO Global Air Quality"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors fine particulate matter levels, a key indicator of air pollution and health risk.
              </p>
            </div>

            {/* Air Pollution Hotspots */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Major Air Pollution Hotspots
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={pollutionHotspotsData}
                  dataSource="AirVisual Global Ranking"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Identifies urban and industrial areas with consistently poor air quality.
              </p>
            </div>

            {/* Pollution Sources */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Primary Sources of Air Pollution
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={pollutionSourcesData}
                  dataSource="Environmental Protection Agency"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Breaks down the primary contributors to air pollution, informing mitigation strategies.
              </p>
            </div>

            {/* AQI Trends by Country */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Air Quality Index (AQI) Trends
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={aqiTrendsData}
                  dataSource="Global Air Quality Database"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Compares air quality levels across different nations using the universal AQI.
              </p>
            </div>

            {/* Health Impact */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Health Impact: Premature Deaths (Millions)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={healthImpactData}
                  dataSource="WHO Health Statistics"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Illustrates the significant health burden caused by poor air quality.
              </p>
            </div>

            {/* AI Forecast Accuracy */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                AI Pollution Forecast Accuracy (%)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={aiForecastData}
                  dataSource="Environmental AI Lab"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Evaluates the precision of AI models in predicting future air quality, aiding public health warnings.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}