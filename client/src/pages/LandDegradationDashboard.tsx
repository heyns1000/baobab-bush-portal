import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LandDegradationDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: landData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'land_degradation', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for land degradation monitoring
  const globalSoilHealthData = [
    { label: '2020', value: 67.2 },
    { label: '2021', value: 66.8 },
    { label: '2022', value: 66.1 },
    { label: '2023', value: 65.7 },
    { label: '2024', value: 65.2 }
  ];

  const desertificationData = [
    { label: 'Africa', value: 12.8 },
    { label: 'Asia', value: 19.2 },
    { label: 'Australia', value: 5.6 },
    { label: 'North America', value: 4.1 },
    { label: 'South America', value: 3.7 },
    { label: 'Europe', value: 1.2 }
  ];

  const soilErosionCausesData = [
    { label: 'Agricultural Practices', value: 38, color: '#dc2626' },
    { label: 'Overgrazing', value: 25, color: '#ea580c' },
    { label: 'Deforestation', value: 22, color: '#d97706' },
    { label: 'Urbanization', value: 10, color: '#ca8a04' },
    { label: 'Climate Change', value: 5, color: '#65a30d' }
  ];

  const soilOrganicCarbonData = [
    { label: 'Grasslands', value: 2.4 },
    { label: 'Croplands', value: 1.8 },
    { label: 'Forests', value: 3.1 },
    { label: 'Wetlands', value: 4.2 },
    { label: 'Urban Areas', value: 1.2 }
  ];

  const landRestorationData = [
    { label: '2020', restoration: 15.2, degradation: 24.8 },
    { label: '2021', restoration: 17.8, degradation: 23.1 },
    { label: '2022', restoration: 19.5, degradation: 21.7 },
    { label: '2023', restoration: 22.1, degradation: 20.3 },
    { label: '2024', restoration: 24.7, degradation: 18.9 }
  ];

  const droughtImpactData = [
    { label: 'Sub-Saharan Africa', value: 78 },
    { label: 'Central Asia', value: 65 },
    { label: 'Mediterranean', value: 52 },
    { label: 'Australia', value: 48 },
    { label: 'Southwest USA', value: 43 },
    { label: 'Northeast Brazil', value: 71 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="land-degradation"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Land Degradation Monitoring Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tracking soil health, desertification, and land restoration efforts worldwide.
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
            {/* Global Soil Health Index */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Soil Health Index
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={globalSoilHealthData}
                  dataSource="Global Soil Partnership"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks overall soil health decline based on nutrient levels, organic matter, and biodiversity.
              </p>
            </div>

            {/* Desertification by Region */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Desertification Progress by Region (Million Hectares/Year)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={desertificationData}
                  dataSource="UN Convention to Combat Desertification"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows regional rates of land turning into desert due to climate and human factors.
              </p>
            </div>

            {/* Soil Erosion Causes */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Primary Causes of Soil Erosion (%)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={soilErosionCausesData}
                  dataSource="International Soil Science Society"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Identifies main drivers of soil erosion to guide prevention strategies.
              </p>
            </div>

            {/* Soil Organic Carbon by Land Use */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Soil Organic Carbon by Land Use (% Content)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={soilOrganicCarbonData}
                  dataSource="Global Soil Organic Carbon Map"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures soil carbon content across different land use types.
              </p>
            </div>

            {/* Land Restoration vs Degradation */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Land Restoration vs Degradation (Million Hectares)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={landRestorationData}
                  dataSource="Global Land Restoration Observatory"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Compares global efforts to restore degraded land versus ongoing degradation.
              </p>
            </div>

            {/* Drought Impact Index */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Drought Impact Index by Region
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={droughtImpactData}
                  dataSource="Global Drought Observatory"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures drought severity and its impact on land productivity and agriculture.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}