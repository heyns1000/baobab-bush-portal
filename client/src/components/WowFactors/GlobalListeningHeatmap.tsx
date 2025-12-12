import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Activity,
  Zap,
  MapPin,
  Clock,
  Headphones,
  Heart,
  Volume2
} from 'lucide-react';

interface ListeningData {
  country: string;
  coordinates: [number, number];
  listeners: number;
  trending: string[];
  intensity: number;
  culturalMoment?: string;
  timeZone: string;
  popularContent: string;
}

export default function GlobalListeningHeatmap() {
  const [realTimeData, setRealTimeData] = useState<ListeningData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [totalGlobalListeners, setTotalGlobalListeners] = useState(0);
  const [activeCultures, setActiveCultures] = useState(0);

  // Simulated real-time listening data
  const generateRealTimeData = (): ListeningData[] => {
    const countries: ListeningData[] = [
      {
        country: "Tanzania",
        coordinates: [-6.369028, 34.888822],
        listeners: 3450 + Math.floor(Math.random() * 500),
        trending: ["Maasai Stories", "Mount Kilimanjaro Legends"],
        intensity: 85 + Math.random() * 15,
        culturalMoment: "Evening storytelling hour",
        timeZone: "EAT",
        popularContent: "Ancient Wisdom Tales"
      },
      {
        country: "Mali",
        coordinates: [17.570692, -3.996166],
        listeners: 2890 + Math.floor(Math.random() * 400),
        trending: ["Griot Traditions", "Sahel Climate Stories"],
        intensity: 78 + Math.random() * 15,
        culturalMoment: "Afternoon gathering time",
        timeZone: "GMT",
        popularContent: "Desert Survival Stories"
      },
      {
        country: "Brazil",
        coordinates: [-14.235004, -51.92528],
        listeners: 5670 + Math.floor(Math.random() * 800),
        trending: ["Amazon Legends", "Capoeira Stories"],
        intensity: 92 + Math.random() * 8,
        culturalMoment: "Carnival preparation stories",
        timeZone: "BRT",
        popularContent: "Rainforest Wisdom"
      },
      {
        country: "India",
        coordinates: [20.593684, 78.96288],
        listeners: 8920 + Math.floor(Math.random() * 1200),
        trending: ["Sanskrit Tales", "Monsoon Stories"],
        intensity: 95 + Math.random() * 5,
        culturalMoment: "Morning meditation stories",
        timeZone: "IST",
        popularContent: "Vedic Philosophy"
      },
      {
        country: "Kenya",
        coordinates: [-0.023559, 37.906193],
        listeners: 4560 + Math.floor(Math.random() * 600),
        trending: ["Wildlife Conservation", "Kikuyu Proverbs"],
        intensity: 89 + Math.random() * 10,
        culturalMoment: "Sunset storytelling",
        timeZone: "EAT",
        popularContent: "Safari Adventures"
      },
      {
        country: "Madagascar",
        coordinates: [-18.766947, 46.869107],
        listeners: 1890 + Math.floor(Math.random() * 300),
        trending: ["Lemur Legends", "Malagasy Folklore"],
        intensity: 76 + Math.random() * 15,
        culturalMoment: "Island evening tales",
        timeZone: "EAT",
        popularContent: "Unique Island Culture"
      },
      {
        country: "Ghana",
        coordinates: [7.946527, -1.023194],
        listeners: 3780 + Math.floor(Math.random() * 500),
        trending: ["Adinkra Symbols", "Cocoa Farm Stories"],
        intensity: 88 + Math.random() * 12,
        culturalMoment: "Market day narratives",
        timeZone: "GMT",
        popularContent: "Gold Coast History"
      },
      {
        country: "Canada",
        coordinates: [56.130366, -106.346771],
        listeners: 2340 + Math.floor(Math.random() * 400),
        trending: ["Inuit Legends", "Arctic Wisdom"],
        intensity: 71 + Math.random() * 20,
        culturalMoment: "Northern lights stories",
        timeZone: "Various",
        popularContent: "Indigenous Knowledge"
      }
    ];

    return countries.map(country => ({
      ...country,
      listeners: country.listeners + Math.floor(Math.random() * 100 - 50),
      intensity: Math.max(60, Math.min(100, country.intensity + Math.random() * 10 - 5))
    }));
  };

  useEffect(() => {
    const updateData = () => {
      const newData = generateRealTimeData();
      setRealTimeData(newData);
      setTotalGlobalListeners(newData.reduce((sum, country) => sum + country.listeners, 0));
      setActiveCultures(newData.length);
    };

    updateData();
    const interval = setInterval(updateData, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 90) return 'bg-red-500';
    if (intensity >= 80) return 'bg-orange-500';
    if (intensity >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getIntensityText = (intensity: number) => {
    if (intensity >= 90) return 'Very High';
    if (intensity >= 80) return 'High';
    if (intensity >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            Global Listening Heatmap
            <Badge className="bg-green-600 text-white animate-pulse">
              🔴 LIVE
            </Badge>
          </CardTitle>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">{totalGlobalListeners.toLocaleString()}</span>
              <span className="text-muted-foreground">listening</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="font-semibold">{activeCultures}</span>
              <span className="text-muted-foreground">cultures active</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalGlobalListeners.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Listeners</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{activeCultures}</div>
            <div className="text-xs text-muted-foreground">Active Cultures</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-xs text-muted-foreground">Countries</div>
          </div>
          <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">156</div>
            <div className="text-xs text-muted-foreground">Languages</div>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {realTimeData.map((country, idx) => (
            <div 
              key={country.country}
              className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer ${
                selectedCountry === country.country 
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-amber-200'
              }`}
              onClick={() => setSelectedCountry(
                selectedCountry === country.country ? null : country.country
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getIntensityColor(country.intensity)} animate-pulse`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                      {country.country}
                    </h3>
                    <p className="text-sm text-muted-foreground">{country.culturalMoment}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Headphones className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-600">
                        {country.listeners.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">listeners</div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`${getIntensityColor(country.intensity)} text-white border-none`}
                  >
                    {getIntensityText(country.intensity)}
                  </Badge>
                </div>
              </div>

              {selectedCountry === country.country && (
                <div className="mt-4 pt-4 border-t border-amber-200 dark:border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                        Trending Now:
                      </h4>
                      <div className="space-y-1">
                        {country.trending.map((trend, tIdx) => (
                          <Badge key={tIdx} variant="secondary" className="mr-1 mb-1">
                            {trend}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                        Popular Content:
                      </h4>
                      <div className="flex items-center gap-2 text-sm">
                        <Volume2 className="w-4 h-4 text-green-600" />
                        <span>{country.popularContent}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        <span>Local time zone: {country.timeZone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-amber-200 dark:border-gray-600">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Cultural Engagement:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getIntensityColor(country.intensity)} transition-all duration-300`}
                            style={{ width: `${country.intensity}%` }}
                          />
                        </div>
                        <span className="font-medium">{country.intensity.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Real-time Updates Indicator */}
        <div className="mt-4 pt-4 border-t border-amber-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span>Updates every 3 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Powered by cultural passion</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}