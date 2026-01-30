import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import InstallPrompt from "@/components/PWA/InstallPrompt";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import BushPortalDashboard from "@/pages/BushPortalDashboard";
import TreeHouses from "@/pages/TreeHouses";
import LivePodcasts from "@/pages/LivePodcasts";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Discovery from "@/pages/Discovery";
import Analytics from "@/pages/Analytics";
import Creator from "@/pages/Creator";
import Community from "@/pages/Community";
import WowFactors from "@/pages/WowFactors";
import LiveCoding from "@/pages/LiveCoding";
import DeforestationDashboard from "@/pages/DeforestationDashboard";
import OceanPlasticDashboard from "@/pages/OceanPlasticDashboard";
import WaterSecurityDashboard from "@/pages/WaterSecurityDashboard";
import WildlifeProtectionDashboard from "@/pages/WildlifeProtectionDashboard";
import AirQualityDashboard from "@/pages/AirQualityDashboard";
import EnergyOptimizationDashboard from "@/pages/EnergyOptimizationDashboard";
import ResourceManagementDashboard from "@/pages/ResourceManagementDashboard";
import GlobalHealthDashboard from "@/pages/GlobalHealthDashboard";
import LandDegradationDashboard from "@/pages/LandDegradationDashboard";
import CommunityResilienceDashboard from "@/pages/CommunityResilienceDashboard";
import EconomicEmpowermentDashboard from "@/pages/EconomicEmpowermentDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/tree-houses" component={TreeHouses} />
      <Route path="/live-podcasts" component={LivePodcasts} />
      <Route path="/discovery" component={Discovery} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/creator" component={Creator} />
      <Route path="/community" component={Community} />
      <Route path="/wow-factors" component={WowFactors} />
      <Route path="/live-coding" component={LiveCoding} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {isLoading || !isAuthenticated ? (
        <Route path="/dashboard" component={Landing} />
      ) : (
        <>
          <Route path="/dashboard" component={BushPortalDashboard} />
          <Route path="/admin-dashboard" component={Dashboard} />
          <Route path="/deforestation" component={DeforestationDashboard} />
          <Route path="/ocean-plastic" component={OceanPlasticDashboard} />
          <Route path="/water-security" component={WaterSecurityDashboard} />
          <Route path="/wildlife-protection" component={WildlifeProtectionDashboard} />
          <Route path="/air-quality" component={AirQualityDashboard} />
          <Route path="/energy" component={EnergyOptimizationDashboard} />
          <Route path="/resources" component={ResourceManagementDashboard} />
          <Route path="/health" component={GlobalHealthDashboard} />
          <Route path="/land-degradation" component={LandDegradationDashboard} />
          <Route path="/community-resilience" component={CommunityResilienceDashboard} />
          <Route path="/economic-empowerment" component={EconomicEmpowermentDashboard} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <InstallPrompt />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
