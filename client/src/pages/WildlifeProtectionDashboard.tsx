import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function WildlifeProtectionDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: wildlifeData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'wildlife', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Sample data for wildlife protection metrics
  const endangeredSpeciesData = [
    { label: '2019', value: 128 },
    { label: '2020', value: 134 },
    { label: '2021', value: 142 },
    { label: '2022', value: 156 },
    { label: '2023', value: 167 }
  ];

  const poachingIncidentsData = [
    { label: 'Africa', value: 2847 },
    { label: 'Asia', value: 1923 },
    { label: 'South America', value: 1456 },
    { label: 'North America', value: 234 },
    { label: 'Oceania', value: 189 },
    { label: 'Europe', value: 67 }
  ];

  const protectedAreasData = [
    { label: 'Protected Land', value: 18.7 },
    { label: 'Unprotected Land', value: 81.3 }
  ];

  const traffickingTypeData = [
    { label: 'Ivory Products', value: 32 },
    { label: 'Live Animals', value: 28 },
    { label: 'Rhino Horn', value: 18 },
    { label: 'Exotic Skins', value: 22 }
  ];

  const speciesPopulationData = [
    { label: '2019', value: 3200 },
    { label: '2020', value: 3180 },
    { label: '2021', value: 3140 },
    { label: '2022', value: 3090 },
    { label: '2023', value: 3020 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="wildlife"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Wildlife Protection & Biodiversity Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tracking endangered species, anti-poaching efforts, and habitat conservation worldwide.
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
            {/* Global Endangered Species Index */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Endangered Species Index
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={endangeredSpeciesData}
                  dataSource="IUCN Red List"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks the overall health of global biodiversity based on threatened species counts.
              </p>
            </div>

            {/* Illegal Poaching Incidents by Continent */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Illegal Poaching Incidents by Continent
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={poachingIncidentsData}
                  dataSource="TRAFFIC Wildlife Trade Monitoring"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Highlights areas with high poaching activity, informing anti-poaching deployments.
              </p>
            </div>

            {/* Protected Areas Coverage */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Protected Areas Coverage (Global)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={protectedAreasData}
                  dataSource="UN Environment Protected Planet"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows the extent of conserved habitats crucial for wildlife survival.
              </p>
            </div>

            {/* Wildlife Trafficking Incidents by Type */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Wildlife Trafficking Incidents by Type
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={traffickingTypeData}
                  dataSource="UNODC Wildlife Crime Report"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Visualizes types of seizures and informs efforts against illegal trade.
              </p>
            </div>

            {/* Key Species Population Trends */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Key Species Population Trends
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={speciesPopulationData}
                  dataSource="WWF Living Planet Index"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors the health and recovery (or decline) of iconic species.
              </p>
            </div>

            {/* AI Surveillance Impact on Poaching */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                AI Surveillance Impact on Poaching
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={[
                    { label: 'AI Alerts Generated', value: 1847 },
                    { label: 'Incidents Prevented', value: 1234 },
                    { label: 'False Positives', value: 89 },
                    { label: 'Successful Interventions', value: 967 }
                  ]}
                  dataSource="Baobab AI Wildlife Protection System"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Quantifies the success of AI in preventing illegal activities in protected areas.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
