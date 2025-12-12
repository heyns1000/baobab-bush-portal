import { apiRequest } from "@/lib/queryClient";

export class ApiService {
  static async syncEnvironmentalData() {
    try {
      const response = await apiRequest('POST', '/api/environmental-data/sync', {});
      return response.json();
    } catch (error) {
      console.error('Failed to sync environmental data:', error);
      throw error;
    }
  }

  static async getEnvironmentalData(params: {
    dataType?: string;
    region?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.dataType) queryParams.append('dataType', params.dataType);
      if (params.region) queryParams.append('region', params.region);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await apiRequest('GET', `/api/environmental-data?${queryParams}`, undefined);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch environmental data:', error);
      throw error;
    }
  }

  static async createCustomAlert(alertData: {
    name: string;
    dataType: string;
    condition: string;
    threshold: number;
    region?: string;
    notificationMethods?: string[];
  }) {
    try {
      const response = await apiRequest('POST', '/api/custom-alerts', alertData);
      return response.json();
    } catch (error) {
      console.error('Failed to create custom alert:', error);
      throw error;
    }
  }

  static async deleteCustomAlert(alertId: number) {
    try {
      const response = await apiRequest('DELETE', `/api/custom-alerts/${alertId}`, undefined);
      return response.json();
    } catch (error) {
      console.error('Failed to delete custom alert:', error);
      throw error;
    }
  }

  static async generateReport(reportData: {
    title: string;
    type: 'pdf' | 'csv' | 'json';
    parameters: any;
  }) {
    try {
      const response = await apiRequest('POST', '/api/reports', reportData);
      return response.json();
    } catch (error) {
      console.error('Failed to generate report:', error);
      throw error;
    }
  }

  static async downloadReport(reportId: number) {
    try {
      const response = await apiRequest('GET', `/api/reports/${reportId}/download`, undefined);
      return response.json();
    } catch (error) {
      console.error('Failed to download report:', error);
      throw error;
    }
  }

  static async markAlertAsRead(alertId: number) {
    try {
      const response = await apiRequest('PATCH', `/api/alerts/${alertId}/read`, {});
      return response.json();
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
      throw error;
    }
  }

  static async updateUserPreferences(preferences: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    autoRefresh?: boolean;
    region?: string;
  }) {
    try {
      const response = await apiRequest('PATCH', '/api/user/preferences', preferences);
      return response.json();
    } catch (error) {
      console.error('Failed to update user preferences:', error);
      throw error;
    }
  }
}
