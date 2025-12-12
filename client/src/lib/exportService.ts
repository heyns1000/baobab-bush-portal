import { ApiService } from "./apiService";

export interface ExportOptions {
  type: 'csv' | 'pdf' | 'json';
  region: string;
  dateRange: string;
  dataTypes: string[];
}

export async function exportData(options: ExportOptions) {
  try {
    // Convert date range to actual dates
    const { startDate, endDate } = parseDateRange(options.dateRange);
    
    // Generate report with the specified parameters
    const report = await ApiService.generateReport({
      title: `Environmental Data Export - ${options.region} - ${options.dateRange}`,
      type: options.type,
      parameters: {
        region: options.region === 'global' ? undefined : options.region,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        dataTypes: options.dataTypes,
      }
    });

    // Poll for completion and trigger download
    pollForReportCompletion(report.id);
    
    return report;
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Failed to export data. Please try again.');
  }
}

function parseDateRange(dateRange: string): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  let startDate = new Date();

  switch (dateRange) {
    case '24h':
      startDate.setDate(endDate.getDate() - 1);
      break;
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
    default:
      startDate.setDate(endDate.getDate() - 7);
  }

  return { startDate, endDate };
}

async function pollForReportCompletion(reportId: number) {
  const maxAttempts = 30; // 30 seconds with 1 second intervals
  let attempts = 0;

  const poll = async () => {
    try {
      const result = await ApiService.downloadReport(reportId);
      
      if (result.downloadUrl) {
        // Trigger download
        const link = document.createElement('a');
        link.href = result.downloadUrl;
        link.download = result.filename || `report_${reportId}.${result.type || 'csv'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
      
      if (attempts < maxAttempts) {
        attempts++;
        setTimeout(poll, 1000);
      } else {
        throw new Error('Report generation timed out');
      }
    } catch (error) {
      if (attempts < maxAttempts) {
        attempts++;
        setTimeout(poll, 1000);
      } else {
        throw error;
      }
    }
  };

  poll();
}

export function downloadCSV(data: any[], filename: string) {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export function downloadJSON(data: any, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
