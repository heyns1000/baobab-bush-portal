export interface ChartData {
  label: string;
  value: number;
}

export interface MetricCardData {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: 'thermometer' | 'flame' | 'droplets' | 'leaf';
  color: 'red' | 'orange' | 'green' | 'blue';
  progress: number;
}

export interface AlertData {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  region?: string;
  timestamp: Date;
  isRead: boolean;
}

export interface DataSourceStatusData {
  name: string;
  status: 'active' | 'delayed' | 'error';
  lastUpdated: Date;
  errorMessage?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoRefresh: boolean;
  region: string;
}

export interface RealTimeDataPoint {
  dataType: string;
  region: string;
  value: number;
  unit: string;
  timestamp: Date;
  source: string;
}

export interface CustomAlertConfig {
  name: string;
  dataType: string;
  condition: '>' | '<' | '>=' | '<=' | '==';
  threshold: number;
  region?: string;
  notificationMethods: string[];
  isActive: boolean;
}

export interface ReportConfig {
  title: string;
  type: 'pdf' | 'csv' | 'json';
  parameters: {
    dataType?: string;
    region?: string;
    startDate?: string;
    endDate?: string;
  };
}

export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  region?: string;
  dataType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
