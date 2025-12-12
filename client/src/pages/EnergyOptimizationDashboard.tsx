import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function EnergyOptimizationDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: energyData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'energy', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for energy optimization monitoring
  const renewableShareData = [
    { label: '2019', value: 26.2 },
    { label: '2020', value: 28.7 },
    { label: '2021', value: 30.1 },
    { label: '2022', value: 31.8 },
    { label: '2023', value: 33.2 },
    { label: '2024', value: 35.6 }
  ];

  const renewableCapacityData = [
    { label: 'China', value: 124.5 },
    { label: 'USA', value: 31.2 },
    { label: 'India', value: 25.8 },
    { label: 'Japan', value: 12.4 },
    { label: 'Germany', value: 10.7 },
    { label: 'Brazil', value: 8.9 }
  ];

  const energyEfficiencyData = [
    { label: '2020', value: 1.8 },
    { label: '2021', value: 2.1 },
    { label: '2022', value: 2.4 },
    { label: '2023', value: 2.7 },
    { label: '2024', value: 3.0 }
  ];

  const gridOptimizationData = [
    { label: '2020', value: 4.2 },
    { label: '2021', value: 3.8 },
    { label: '2022', value: 3.4 },
    { label: '2023', value: 3.1 },
    { label: '2024', value: 2.7 }
  ];

  const co2AvoidedData = [
    { label: '2020', value: 2.1 },
    { label: '2021', value: 2.4 },
    { label: '2022', value: 2.8 },
    { label: '2023', value: 3.2 },
    { label: '2024', value: 3.6 }
  ];

  const cleanEnergyInvestmentData = [
    { label: '2020', value: 303 },
    { label: '2021', value: 366 },
    { label: '2022', value: 423 },
    { label: '2023', value: 489 },
    { label: '2024', value: 542 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="energy"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Energy Optimization Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tracking the global shift to sustainable energy and optimizing energy grids with AI.
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
            {/* Renewable Energy Share */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Renewable Energy Share (%)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={renewableShareData}
                  dataSource="IEA Global Energy Statistics"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows the growing contribution of solar, wind, hydro, etc., to the global energy mix.
              </p>
            </div>

            {/* Renewable Capacity by Country */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Leading Countries in Renewable Capacity (GW Added)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={renewableCapacityData}
                  dataSource="Global Renewable Energy Database"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Highlights nations making significant investments in new renewable energy infrastructure.
              </p>
            </div>

            {/* Energy Efficiency Improvements */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Energy Efficiency Gains (% Improvement)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={energyEfficiencyData}
                  dataSource="International Energy Efficiency Agency"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors the effectiveness of policies and technologies in reducing energy consumption per unit of economic output.
              </p>
            </div>

            {/* AI Grid Optimization */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                AI Grid Optimization Impact (Avg. Outage Duration Hours)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={gridOptimizationData}
                  dataSource="Smart Grid Analytics Platform"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Illustrates how AI integration enhances grid reliability and minimizes disruptions.
              </p>
            </div>

            {/* CO2 Emissions Avoided */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                CO2 Emissions Avoided by Renewables (Gigatons)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={co2AvoidedData}
                  dataSource="Climate Action Tracker"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Quantifies the positive environmental impact of renewable energy deployment.
              </p>
            </div>

            {/* Clean Energy Investment */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Investment in Clean Energy Technologies (Billions USD)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={cleanEnergyInvestmentData}
                  dataSource="BloombergNEF Energy Finance"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks financial flows into solar, wind, battery storage, and other clean tech sectors.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}