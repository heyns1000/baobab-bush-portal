import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";  
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function WaterSecurityDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: waterData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'water_quality', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data based on water security HTML file
  const safeWaterAccessData = Array.from({length: 10}, (_, i) => ({
    label: 2015 + i,
    value: 68.5 + (i * 1.8) + (Math.random() - 0.5) * 2
  }));

  const waterStressData = [
    { label: 'Africa', value: 3.8 },
    { label: 'Asia', value: 2.1 },
    { label: 'Europe', value: 1.7 },
    { label: 'North America', value: 1.2 },
    { label: 'South America', value: 0.9 },
    { label: 'Oceania', value: 0.6 }
  ];

  const waterQualityData = Array.from({length: 12}, (_, i) => ({
    label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: 78 + (Math.sin(i * 0.5) * 8) + (Math.random() - 0.5) * 4
  }));

  const groundwaterDepletionData = [
    { label: 'California Central Valley', value: -2.8 },
    { label: 'Indo-Gangetic Basin', value: -4.2 },
    { label: 'Arabian Peninsula', value: -6.1 },
    { label: 'North China Plain', value: -3.7 },
    { label: 'High Plains Aquifer', value: -1.9 },
    { label: 'Northwest Sahara', value: -5.4 }
  ];

  const disasterEventsData = Array.from({length: 8}, (_, i) => ({
    label: 2017 + i,
    value: 150 + Math.floor(Math.random() * 100)
  }));

  const waterUsageData = [
    { label: 'Agriculture', value: 70, color: '#16a34a' },
    { label: 'Industry', value: 19, color: '#2563eb' },
    { label: 'Municipal', value: 11, color: '#dc2626' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="water"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Water Security & Quality Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitoring global water resources, access to clean water, and water quality.
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
            {/* Access to Safe Drinking Water */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Access to Safe Drinking Water
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={safeWaterAccessData}
                  dataSource="WHO/UNICEF Joint Monitoring Programme"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks progress towards universal access to clean and accessible drinking water (SDG 6.1).
              </p>
            </div>

            {/* Water Stress Index by Continent */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Water Stress Index by Continent
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={waterStressData}
                  dataSource="World Resources Institute"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Highlights regions where water demand exceeds available renewable water resources.
              </p>
            </div>

            {/* Global Water Quality Index */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Freshwater Quality
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={waterQualityData}
                  dataSource="UNEP Global Environment Monitoring System"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Assesses the health of freshwater ecosystems based on pollution indicators.
              </p>
            </div>

            {/* Groundwater Depletion Rates */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Groundwater Depletion Rates
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={[
                    { label: 'Middle East', value: 0.8 },
                    { label: 'South Asia', value: 0.7 },
                    { label: 'North Africa', value: 0.6 },
                    { label: 'Central Asia', value: 0.5 },
                    { label: 'North America', value: 0.3 },
                    { label: 'Europe', value: 0.1 }
                  ]}
                  dataSource="GRACE Satellite Data"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors the sustainability of groundwater abstraction, crucial for long-term water security.
              </p>
            </div>

            {/* Water-related Disaster Events */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Water-Related Disaster Occurrences
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={[
                    { label: '2019', value: 145 },
                    { label: '2020', value: 167 },
                    { label: '2021', value: 189 },
                    { label: '2022', value: 203 },
                    { label: '2023', value: 224 }
                  ]}
                  dataSource="EM-DAT International Disaster Database"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks the frequency and impact of floods and droughts globally, linked to climate change.
              </p>
            </div>

            {/* AI Water Distribution Efficiency */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                AI Water Distribution Efficiency
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={distributionEfficiencyData}
                  dataSource="Baobab AI Water Management"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows how AI helps reduce leaks and optimize water delivery in urban and rural areas.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
