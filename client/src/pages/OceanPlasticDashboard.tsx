import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function OceanPlasticDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: plasticData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'ocean_plastic', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for ocean plastic monitoring
  const plasticAccumulationData = [
    { label: 'Jan', value: 8.2 },
    { label: 'Feb', value: 8.4 },
    { label: 'Mar', value: 8.7 },
    { label: 'Apr', value: 9.1 },
    { label: 'May', value: 9.3 },
    { label: 'Jun', value: 9.6 },
    { label: 'Jul', value: 9.8 },
    { label: 'Aug', value: 10.1 },
    { label: 'Sep', value: 10.3 },
    { label: 'Oct', value: 10.5 },
    { label: 'Nov', value: 10.7 },
    { label: 'Dec', value: 10.9 }
  ];

  const plasticByRegionData = [
    { label: 'Pacific Ocean', value: 4800 },
    { label: 'Atlantic Ocean', value: 3200 },
    { label: 'Indian Ocean', value: 2100 },
    { label: 'Arctic Ocean', value: 890 },
    { label: 'Mediterranean Sea', value: 750 },
    { label: 'Caribbean Sea', value: 620 }
  ];

  const plasticTypesData = [
    { label: 'Microplastics', value: 42, color: '#dc2626' },
    { label: 'Plastic Bottles', value: 23, color: '#ea580c' },
    { label: 'Fishing Gear', value: 18, color: '#d97706' },
    { label: 'Food Packaging', value: 12, color: '#ca8a04' },
    { label: 'Other', value: 5, color: '#65a30d' }
  ];

  const cleanupEffortsData = [
    { label: '2020', collected: 1200, prevented: 800 },
    { label: '2021', collected: 1450, prevented: 950 },
    { label: '2022', collected: 1680, prevented: 1100 },
    { label: '2023', collected: 1920, prevented: 1280 },
    { label: '2024', collected: 2150, prevented: 1450 }
  ];

  const pollutionSourcesData = [
    { label: 'Land-based waste', value: 68 },
    { label: 'Maritime activities', value: 20 },
    { label: 'Aquaculture', value: 8 },
    { label: 'Offshore platforms', value: 4 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="ocean-plastic"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Ocean Plastic Concentration Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitoring plastic pollution hotspots and cleanup progress worldwide.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="border-none focus:ring-0 text-sm max-w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Oceans</SelectItem>
                  <SelectItem value="Pacific">Pacific Ocean</SelectItem>
                  <SelectItem value="Atlantic">Atlantic Ocean</SelectItem>
                  <SelectItem value="Indian">Indian Ocean</SelectItem>
                  <SelectItem value="Arctic">Arctic Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Ocean Plastic Accumulation */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Ocean Plastic Accumulation
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={plasticAccumulationData}
                  dataSource="Ocean Cleanup Foundation"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monthly tracking of plastic accumulation in major ocean gyres and pollution hotspots.
              </p>
            </div>

            {/* Plastic by Ocean Region */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Plastic Concentration by Ocean Region
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={plasticByRegionData}
                  dataSource="NOAA Marine Debris"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Regional distribution of plastic waste concentration measured in tons per square kilometer.
              </p>
            </div>

            {/* Plastic Types Distribution */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Types of Ocean Plastic Pollution
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={plasticTypesData}
                  dataSource="Marine Plastic Research"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Breakdown of plastic waste types found in ocean environments and marine ecosystems.
              </p>
            </div>

            {/* Cleanup Efforts Progress */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ocean Cleanup Progress
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={cleanupEffortsData}
                  dataSource="Global Ocean Cleanup Initiative"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Annual progress in plastic collection and prevention efforts across global cleanup programs.
              </p>
            </div>

            {/* Pollution Sources */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ocean Plastic Pollution Sources
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={pollutionSourcesData}
                  dataSource="UN Environment Programme"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Primary sources contributing to ocean plastic pollution measured by percentage contribution.
              </p>
            </div>

            {/* Marine Impact Assessment */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Marine Ecosystem Impact
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={[
                    { label: 'Severely Affected', value: 34, color: '#dc2626' },
                    { label: 'Moderately Affected', value: 41, color: '#ea580c' },
                    { label: 'Minimally Affected', value: 25, color: '#65a30d' }
                  ]}
                  dataSource="Marine Biology Institute"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Assessment of marine ecosystem health impact from plastic pollution across global ocean regions.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}