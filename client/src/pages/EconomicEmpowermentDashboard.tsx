import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function EconomicEmpowermentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: economicData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'economic_empowerment', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for economic empowerment monitoring
  const globalPovertyData = [
    { label: '2020', value: 9.2 },
    { label: '2021', value: 9.7 },
    { label: '2022', value: 8.9 },
    { label: '2023', value: 8.5 },
    { label: '2024', value: 8.1 }
  ];

  const unemploymentRatesData = [
    { label: 'Sub-Saharan Africa', value: 7.3 },
    { label: 'South Asia', value: 5.8 },
    { label: 'Middle East & North Africa', value: 12.1 },
    { label: 'Latin America', value: 8.4 },
    { label: 'East Asia', value: 4.2 },
    { label: 'Europe & Central Asia', value: 6.7 }
  ];

  const womenEconomicParticipationData = [
    { label: 'Labor Force Participation', value: 52.8, color: '#2563eb' },
    { label: 'Entrepreneurship Rate', value: 12.3, color: '#16a34a' },
    { label: 'Financial Inclusion', value: 65.4, color: '#ca8a04' },
    { label: 'Leadership Positions', value: 28.7, color: '#7c3aed' }
  ];

  const microfinanceImpactData = [
    { label: '2020', borrowers: 140.2, repayment: 97.3 },
    { label: '2021', borrowers: 143.8, repayment: 96.8 },
    { label: '2022', borrowers: 147.5, repayment: 97.1 },
    { label: '2023', borrowers: 151.2, repayment: 97.5 },
    { label: '2024', borrowers: 155.8, repayment: 97.8 }
  ];

  const digitalEconomyData = [
    { label: 'North America', value: 8.2 },
    { label: 'Europe', value: 7.1 },
    { label: 'East Asia', value: 6.8 },
    { label: 'Latin America', value: 4.9 },
    { label: 'Middle East', value: 4.2 },
    { label: 'Africa', value: 2.3 }
  ];

  const greenJobsData = [
    { label: 'Renewable Energy', value: 13.7, color: '#16a34a' },
    { label: 'Energy Efficiency', value: 9.2, color: '#65a30d' },
    { label: 'Sustainable Transport', value: 5.8, color: '#ca8a04' },
    { label: 'Waste Management', value: 4.3, color: '#2563eb' },
    { label: 'Sustainable Agriculture', value: 3.1, color: '#7c3aed' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="economic-empowerment"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Economic Empowerment & Sustainability Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitoring poverty reduction, employment, financial inclusion, and sustainable economic growth.
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
            {/* Global Extreme Poverty Rate */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Extreme Poverty Rate (%)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={globalPovertyData}
                  dataSource="World Bank Poverty Statistics"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks progress toward eliminating extreme poverty (living on less than $2.15/day).
              </p>
            </div>

            {/* Regional Unemployment Rates */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Regional Unemployment Rates (%)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={unemploymentRatesData}
                  dataSource="International Labour Organization"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows regional employment challenges and economic opportunities.
              </p>
            </div>

            {/* Women's Economic Participation */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Women's Economic Participation Metrics (%)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={womenEconomicParticipationData}
                  dataSource="UN Women Economic Empowerment"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures women's participation in economic activities and leadership roles.
              </p>
            </div>

            {/* Microfinance Impact */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Microfinance: Borrowers vs Repayment Rate
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={microfinanceImpactData}
                  dataSource="Microfinance Information Exchange"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks microfinance reach and sustainability in supporting small enterprises.
              </p>
            </div>

            {/* Digital Economy Contribution */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Digital Economy Contribution to GDP (%)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={digitalEconomyData}
                  dataSource="Digital Economy Observatory"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows the growing importance of digital technologies in economic development.
              </p>
            </div>

            {/* Green Jobs Creation */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Green Jobs by Sector (Millions of Jobs)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={greenJobsData}
                  dataSource="International Renewable Energy Agency"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks employment opportunities in sustainable and environmentally friendly sectors.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}