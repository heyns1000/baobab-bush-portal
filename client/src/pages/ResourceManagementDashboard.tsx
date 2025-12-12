import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function ResourceManagementDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: resourceData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'resources', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for resource management monitoring
  const globalRecyclingData = [
    { label: '2020', value: 13.5 },
    { label: '2021', value: 14.2 },
    { label: '2022', value: 15.1 },
    { label: '2023', value: 16.8 },
    { label: '2024', value: 17.9 }
  ];

  const wasteGenerationData = [
    { label: 'China', value: 220.4 },
    { label: 'USA', value: 258.5 },
    { label: 'India', value: 65.3 },
    { label: 'Japan', value: 43.2 },
    { label: 'Germany', value: 38.1 },
    { label: 'Brazil', value: 35.8 }
  ];

  const circularEconomyData = [
    { label: 'Materials Recycled', value: 32, color: '#16a34a' },
    { label: 'Materials Reused', value: 18, color: '#ca8a04' },
    { label: 'Materials Landfilled', value: 35, color: '#dc2626' },
    { label: 'Materials Incinerated', value: 15, color: '#ea580c' }
  ];

  const criticalMineralsData = [
    { label: 'Lithium', value: 85 },
    { label: 'Cobalt', value: 78 },
    { label: 'Rare Earth Elements', value: 92 },
    { label: 'Graphite', value: 73 },
    { label: 'Nickel', value: 81 }
  ];

  const plasticWasteData = [
    { label: '2020', collected: 85, recycled: 23 },
    { label: '2021', collected: 92, recycled: 28 },
    { label: '2022', collected: 98, recycled: 34 },
    { label: '2023', collected: 105, recycled: 41 },
    { label: '2024', collected: 112, recycled: 48 }
  ];

  const resourceEfficiencyData = [
    { label: 'Manufacturing', value: 78.3 },
    { label: 'Construction', value: 65.7 },
    { label: 'Agriculture', value: 71.2 },
    { label: 'Transportation', value: 83.9 },
    { label: 'Energy', value: 88.4 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="resources"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Resource Management Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitoring resource consumption, recycling rates, and circular economy progress worldwide.
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
            {/* Global Recycling Rates */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Recycling Rates (%)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={globalRecyclingData}
                  dataSource="UN Environment Programme"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks global progress in recycling and waste diversion from landfills.
              </p>
            </div>

            {/* Waste Generation by Country */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Waste Generation by Country (Million Tons/Year)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={wasteGenerationData}
                  dataSource="World Bank Waste Statistics"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Highlights countries with the highest waste generation requiring improved management.
              </p>
            </div>

            {/* Circular Economy Metrics */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Circular Economy Material Flow (%)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={circularEconomyData}
                  dataSource="Circular Economy Institute"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows how materials flow through the global economy and circular systems.
              </p>
            </div>

            {/* Critical Minerals Supply Risk */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Critical Minerals Supply Risk Index
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={criticalMineralsData}
                  dataSource="Critical Materials Institute"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors supply chain risks for materials essential to clean energy transition.
              </p>
            </div>

            {/* Plastic Waste Management */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Plastic Waste Management (Million Tons)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={plasticWasteData}
                  dataSource="Plastic Waste Observatory"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks collection and recycling progress for plastic waste globally.
              </p>
            </div>

            {/* Resource Efficiency by Sector */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Resource Efficiency by Sector (%)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={resourceEfficiencyData}
                  dataSource="Resource Efficiency Institute"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures how efficiently different economic sectors use natural resources.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}