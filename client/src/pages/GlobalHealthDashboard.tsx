import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function GlobalHealthDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: healthData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'health', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for global health monitoring
  const lifeExpectancyData = [
    { label: '2020', value: 72.8 },
    { label: '2021', value: 71.4 },
    { label: '2022', value: 72.1 },
    { label: '2023', value: 72.7 },
    { label: '2024', value: 73.2 }
  ];

  const diseaseOutbreaksData = [
    { label: 'COVID-19', value: 95 },
    { label: 'Dengue', value: 23 },
    { label: 'Malaria', value: 18 },
    { label: 'Cholera', value: 12 },
    { label: 'Measles', value: 8 },
    { label: 'Yellow Fever', value: 4 }
  ];

  const environmentalHealthData = [
    { label: 'Air Pollution Deaths', value: 7.0, color: '#dc2626' },
    { label: 'Water Pollution Deaths', value: 1.4, color: '#2563eb' },
    { label: 'Soil Contamination', value: 0.8, color: '#ca8a04' },
    { label: 'Chemical Exposure', value: 1.2, color: '#16a34a' },
    { label: 'Climate-related', value: 0.6, color: '#ea580c' }
  ];

  const healthcareAccessData = [
    { label: 'Africa', value: 42 },
    { label: 'Asia', value: 68 },
    { label: 'Europe', value: 94 },
    { label: 'North America', value: 89 },
    { label: 'South America', value: 76 },
    { label: 'Oceania', value: 85 }
  ];

  const vaccinationCoverageData = [
    { label: '2020', coverage: 85.2, hesitancy: 14.8 },
    { label: '2021', coverage: 73.4, hesitancy: 26.6 },
    { label: '2022', coverage: 78.9, hesitancy: 21.1 },
    { label: '2023', coverage: 82.1, hesitancy: 17.9 },
    { label: '2024', coverage: 84.5, hesitancy: 15.5 }
  ];

  const mentalHealthData = [
    { label: 'Depression', value: 3.8 },
    { label: 'Anxiety Disorders', value: 4.1 },
    { label: 'Bipolar Disorder', value: 0.6 },
    { label: 'Schizophrenia', value: 0.3 },
    { label: 'PTSD', value: 0.9 }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="health"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Global Health Monitoring Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tracking global health indicators, disease outbreaks, and environmental health impacts.
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
            {/* Global Life Expectancy */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Life Expectancy (Years)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={lifeExpectancyData}
                  dataSource="WHO Global Health Observatory"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks global average life expectancy and recovery from pandemic impacts.
              </p>
            </div>

            {/* Disease Outbreaks */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Active Disease Outbreaks (Current Cases in Thousands)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={diseaseOutbreaksData}
                  dataSource="WHO Disease Outbreak News"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors ongoing infectious disease outbreaks requiring global attention.
              </p>
            </div>

            {/* Environmental Health Impact */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Environmental Health Deaths (Millions/Year)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={environmentalHealthData}
                  dataSource="Global Burden of Disease Study"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows deaths attributable to environmental factors and pollution exposure.
              </p>
            </div>

            {/* Healthcare Access */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Healthcare Access Index by Region (%)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={healthcareAccessData}
                  dataSource="Universal Health Coverage Index"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures access to essential health services across global regions.
              </p>
            </div>

            {/* Vaccination Coverage */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Vaccination Coverage vs Hesitancy (%)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={vaccinationCoverageData}
                  dataSource="WHO Immunization Surveillance"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks vaccination rates and addresses vaccine hesitancy trends globally.
              </p>
            </div>

            {/* Mental Health Burden */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Mental Health Disorders (% of Population)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={mentalHealthData}
                  dataSource="Global Health Data Exchange"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Monitors prevalence of major mental health conditions worldwide.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}