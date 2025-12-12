import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function CommunityResilienceDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All");

  const { data: resilienceData, isLoading } = useQuery({
    queryKey: ['/api/environmental-data', { dataType: 'community_resilience', region: selectedRegion }],
    refetchInterval: 30000,
  });

  const { data: dataSourceStatuses } = useQuery({
    queryKey: ['/api/data-sources/status'],
  });

  // Chart data for community resilience monitoring
  const resilienceIndexData = [
    { label: '2020', value: 67.2 },
    { label: '2021', value: 69.1 },
    { label: '2022', value: 71.5 },
    { label: '2023', value: 73.8 },
    { label: '2024', value: 76.2 }
  ];

  const vulnerabilityFactorsData = [
    { label: 'Climate Change', value: 28, color: '#dc2626' },
    { label: 'Economic Instability', value: 24, color: '#ea580c' },
    { label: 'Social Inequality', value: 22, color: '#d97706' },
    { label: 'Infrastructure Gaps', value: 18, color: '#ca8a04' },
    { label: 'Political Instability', value: 8, color: '#65a30d' }
  ];

  const adaptationMeasuresData = [
    { label: 'Early Warning Systems', value: 82 },
    { label: 'Infrastructure Hardening', value: 67 },
    { label: 'Community Training', value: 74 },
    { label: 'Economic Diversification', value: 59 },
    { label: 'Ecosystem Restoration', value: 71 },
    { label: 'Social Safety Nets', value: 63 }
  ];

  const disasterPreparednessData = [
    { label: 'Japan', value: 94 },
    { label: 'Singapore', value: 91 },
    { label: 'Norway', value: 89 },
    { label: 'Switzerland', value: 87 },
    { label: 'Denmark', value: 85 },
    { label: 'Germany', value: 83 }
  ];

  const socialCohesionData = [
    { label: '2020', trust: 68, participation: 54 },
    { label: '2021', trust: 69, participation: 57 },
    { label: '2022', trust: 71, participation: 61 },
    { label: '2023', trust: 73, participation: 64 },
    { label: '2024', trust: 75, participation: 67 }
  ];

  const economicDiversityData = [
    { label: 'Services', value: 42, color: '#2563eb' },
    { label: 'Manufacturing', value: 28, color: '#16a34a' },
    { label: 'Agriculture', value: 15, color: '#ca8a04' },
    { label: 'Technology', value: 10, color: '#7c3aed' },
    { label: 'Other', value: 5, color: '#dc2626' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
        activeSection="community-resilience"
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Community Resilience & Adaptation Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitoring community preparedness, adaptation capacity, and resilience to global challenges.
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
            {/* Global Resilience Index */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Global Community Resilience Index
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={resilienceIndexData}
                  dataSource="Global Resilience Institute"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures overall community capacity to withstand and recover from shocks and stresses.
              </p>
            </div>

            {/* Main Vulnerability Factors */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Primary Community Vulnerability Factors (%)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={vulnerabilityFactorsData}
                  dataSource="Community Vulnerability Assessment"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Identifies key factors that make communities vulnerable to environmental and social risks.
              </p>
            </div>

            {/* Adaptation Measures Implementation */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Climate Adaptation Measures Implementation (%)
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={adaptationMeasuresData}
                  dataSource="Climate Adaptation Tracker"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Tracks implementation of key adaptation strategies across global communities.
              </p>
            </div>

            {/* Disaster Preparedness Rankings */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Top Countries by Disaster Preparedness Score
              </h3>
              <div className="flex-grow">
                <BarChart
                  title=""
                  subtitle=""
                  data={disasterPreparednessData}
                  dataSource="Global Disaster Preparedness Index"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Rankings based on early warning systems, response capacity, and recovery planning.
              </p>
            </div>

            {/* Social Cohesion Metrics */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Social Cohesion: Trust vs Civic Participation (%)
              </h3>
              <div className="flex-grow">
                <LineChart
                  title=""
                  subtitle=""
                  data={socialCohesionData}
                  dataSource="World Values Survey"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Measures community bonds and collective action capacity essential for resilience.
              </p>
            </div>

            {/* Economic Diversity Index */}
            <div className="widget-card p-4 md:p-6 flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Economic Sector Diversity (Global Average %)
              </h3>
              <div className="flex-grow">
                <DoughnutChart
                  title=""
                  subtitle=""
                  data={economicDiversityData}
                  dataSource="Economic Resilience Observatory"
                  height={320}
                  showControls={false}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Shows economic diversification which reduces vulnerability to sector-specific shocks.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}