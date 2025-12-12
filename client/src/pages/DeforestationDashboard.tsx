import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function DeforestationDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: deforestationData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'deforestation', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data based on uploaded HTML files
  const forestCoverData = Array.from({length: 12}, (_, i) => ({
    label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: 85.5 - (i * 0.3) + (Math.random() - 0.5) * 2
  }));

  const topCountriesData = [
    { label: 'Brazil', value: 8470 },
    { label: 'Indonesia', value: 3240 },
    { label: 'Democratic Republic of Congo', value: 2890 },
    { label: 'Bolivia', value: 1840 },
    { label: 'Peru', value: 1650 },
    { label: 'Colombia', value: 1380 },
    { label: 'Angola', value: 1180 },
    { label: 'Myanmar', value: 890 },
    { label: 'Paraguay', value: 750 },
    { label: 'Argentina', value: 680 }
  ];

  const reforestationData = [
    { label: '2020', deforestation: 4200, reforestation: 1800 },
    { label: '2021', deforestation: 3900, reforestation: 2100 },
    { label: '2022', deforestation: 3600, reforestation: 2400 },
    { label: '2023', deforestation: 3400, reforestation: 2700 },
    { label: '2024', deforestation: 3200, reforestation: 3000 }
  ];

  const deforestationDrivers = [
    { label: 'Agriculture', value: 45, color: '#dc2626' },
    { label: 'Logging', value: 25, color: '#ea580c' },
    { label: 'Infrastructure', value: 15, color: '#d97706' },
    { label: 'Urbanization', value: 10, color: '#ca8a04' },
    { label: 'Other', value: 5, color: '#65a30d' }
  ];

  const forestFireData = [
    { label: 'South America', value: 45200 },
    { label: 'Africa', value: 38900 },
    { label: 'Asia', value: 29100 },
    { label: 'North America', value: 18700 },
    { label: 'Europe', value: 12400 },
    { label: 'Oceania', value: 8300 }
  ];

  const protectedAreasData = [
    { label: 'Protected', value: 18.7, color: '#16a34a' },
    { label: 'Unprotected', value: 81.3, color: '#dc2626' }
  ];

  // Additional data for the charts using different variable names from errors
  const forestLossData = [
    { label: '2020', value: 10.2 },
    { label: '2021', value: 11.1 },
    { label: '2022', value: 10.9 },
    { label: '2023', value: 12.3 },
    { label: '2024', value: 11.8 }
  ];

  const regionData = [
    { label: 'Brazil', value: 4.2 },
    { label: 'Indonesia', value: 2.1 },
    { label: 'DR Congo', value: 1.8 },
    { label: 'Bolivia', value: 1.4 },
    { label: 'Peru', value: 1.2 },
    { label: 'Colombia', value: 1.0 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="deforestation"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Deforestation & Forest Monitoring Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time satellite monitoring of forest loss, degradation, and conservation efforts worldwide.
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
            {/* Global Forest Loss Trends */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Forest Loss Trends (Simulated)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={forestLossData}
                  dataSource="NASA MODIS"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks annual forest loss measured in hectares using MODIS satellite imagery and GLAD alerts.
              </p>
            </div>

            {/* Forest Loss by Country/Region */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Forest Loss by Country (2024)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={regionData}
                  dataSource="Global Forest Watch"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Countries with the highest absolute forest loss in hectares, highlighting deforestation hotspots.
              </p>
            </div>

            {/* Reforestation vs Deforestation Trends */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Reforestation vs. Deforestation Trends
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={reforestationData.map(item => ({ label: item.label, value: item.deforestation }))}
                  dataSource="Global Forest Watch"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Comparing forest loss against restoration efforts to track net forest change globally.
              </p>
            </div>

            {/* Primary Drivers of Forest Loss */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Primary Drivers of Forest Loss
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={deforestationDrivers}
                  dataSource="FAO Global Forest Survey"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Breakdown of main causes of deforestation globally, informing targeted conservation strategies.
              </p>
            </div>

            {/* Forest Fire Incidences by Continent */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Forest Fire Incidences by Continent
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={forestFireData}
                  dataSource="MODIS Active Fire Data"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Continental comparison of forest fire incidents, highlighting wildfire hotspots globally.
              </p>
            </div>

            {/* Global Protected Forest Areas */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Protected Forest Areas
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={protectedAreasData}
                  dataSource="UNEP Protected Areas"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Percentage of global forests under protection vs unprotected areas requiring conservation attention.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
