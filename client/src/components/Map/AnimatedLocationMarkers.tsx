import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Radio, Users, Activity, Navigation, Zap } from 'lucide-react';
import baobabLocations from '@/data/baobab-locations.json';

interface AnimatedMarker {
  id: string;
  country: string;
  coordinates: [number, number];
  status: string;
  listeners: number;
  activePodcasters: number;
  pulseIntensity: number;
  isActive: boolean;
}

export default function AnimatedLocationMarkers() {
  const [markers, setMarkers] = useState<AnimatedMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
    // Transform baobab locations into animated markers
    const animatedMarkers = baobabLocations.features.map((feature, index) => ({
      id: feature.properties.tree_house_id,
      country: feature.properties.country,
      coordinates: feature.geometry.coordinates as [number, number],
      status: feature.properties.status,
      listeners: Math.floor(Math.random() * 1000) + 100,
      activePodcasters: Math.floor(Math.random() * feature.properties.podcast_capacity * 0.8),
      pulseIntensity: Math.random() * 100,
      isActive: feature.properties.status === 'Active'
    }));

    setMarkers(animatedMarkers);

    // Animate markers every 3 seconds
    const interval = setInterval(() => {
      setMarkers(prev => prev.map(marker => ({
        ...marker,
        listeners: marker.listeners + Math.floor(Math.random() * 20) - 10,
        pulseIntensity: Math.random() * 100,
        activePodcasters: Math.max(0, marker.activePodcasters + Math.floor(Math.random() * 6) - 3)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getMarkerColor = (marker: AnimatedMarker) => {
    if (!marker.isActive) return 'text-gray-400';
    if (marker.pulseIntensity > 70) return 'text-red-500';
    if (marker.pulseIntensity > 40) return 'text-amber-500';
    return 'text-green-500';
  };

  const getMarkerSize = (marker: AnimatedMarker) => {
    const baseSize = marker.isActive ? 8 : 6;
    const pulseBoost = marker.pulseIntensity > 80 ? 2 : 0;
    return baseSize + pulseBoost;
  };

  const getActivityLevel = (marker: AnimatedMarker) => {
    if (marker.pulseIntensity > 70) return 'High Activity';
    if (marker.pulseIntensity > 40) return 'Medium Activity';
    return 'Low Activity';
  };

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="text-4xl mr-3">🗺️</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100">
            Global Network Activity
          </h2>
        </div>
        <p className="text-lg text-amber-600 dark:text-amber-200 max-w-2xl mx-auto">
          Real-time visualization of podcast activity across our baobab tree house network.
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-1 bg-amber-100 dark:bg-gray-700 rounded-lg">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            Grid View
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            onClick={() => setViewMode('map')}
            className={viewMode === 'map' ? 'bg-amber-600 hover:bg-amber-700' : ''}
          >
            Map View
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {markers.map((marker) => (
            <Card 
              key={marker.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedMarker === marker.id ? 'ring-2 ring-amber-500' : ''
              } ${marker.isActive ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}`}
              onClick={() => handleMarkerClick(marker.id)}
              data-testid={`location-marker-${marker.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className={`relative ${getMarkerColor(marker)}`}>
                      <MapPin className={`w-${getMarkerSize(marker)} h-${getMarkerSize(marker)}`} />
                      {marker.isActive && marker.pulseIntensity > 60 && (
                        <div className="absolute inset-0 animate-ping">
                          <MapPin className={`w-${getMarkerSize(marker)} h-${getMarkerSize(marker)} opacity-75`} />
                        </div>
                      )}
                    </div>
                    <span className="text-base">{marker.country}</span>
                  </CardTitle>
                  <Badge 
                    variant={marker.isActive ? 'default' : 'secondary'}
                    className={marker.isActive ? 'bg-green-600' : ''}
                  >
                    {marker.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {marker.isActive && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        Listeners
                      </span>
                      <span className="font-medium">{marker.listeners.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Radio className="w-4 h-4" />
                        Active Podcasters
                      </span>
                      <span className="font-medium">{marker.activePodcasters}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Activity className="w-4 h-4" />
                        Activity Level
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          marker.pulseIntensity > 70 ? 'border-red-500 text-red-500' :
                          marker.pulseIntensity > 40 ? 'border-amber-500 text-amber-500' :
                          'border-green-500 text-green-500'
                        }`}
                      >
                        {getActivityLevel(marker)}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      📍 {marker.coordinates[1].toFixed(4)}°, {marker.coordinates[0].toFixed(4)}°
                    </div>
                  </>
                )}

                {!marker.isActive && (
                  <div className="text-center py-4 text-muted-foreground">
                    <div className="text-2xl mb-2">🚧</div>
                    <p className="text-sm">Coming Soon</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Map View Simulation */
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
          <div className="relative h-96 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
            {/* Simulated World Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 opacity-30"></div>
            
            {/* Animated Markers */}
            <div className="absolute inset-0">
              {markers.map((marker, index) => {
                // Simulate map coordinates (simplified positioning)
                const x = ((marker.coordinates[0] + 180) / 360) * 100;
                const y = ((90 - marker.coordinates[1]) / 180) * 100;
                
                return (
                  <div
                    key={marker.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${Math.max(5, Math.min(95, x))}%`, 
                      top: `${Math.max(5, Math.min(95, y))}%` 
                    }}
                    onClick={() => handleMarkerClick(marker.id)}
                    data-testid={`map-marker-${marker.id}`}
                  >
                    <div className="relative group">
                      <div className={`${getMarkerColor(marker)} transition-all duration-300`}>
                        <MapPin className={`w-6 h-6 ${marker.isActive ? 'hover:scale-110' : ''}`} />
                        {marker.isActive && marker.pulseIntensity > 70 && (
                          <div className="absolute inset-0 animate-ping opacity-75">
                            <MapPin className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        <div className="font-semibold">{marker.country}</div>
                        {marker.isActive && (
                          <div>{marker.listeners} listeners • {marker.activePodcasters} active</div>
                        )}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
              <div className="text-sm font-semibold mb-2">Activity Levels</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>High Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Medium Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>Low Activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Live Activity
              </div>
              <div className="space-y-1 text-xs">
                <div>{markers.filter(m => m.isActive).length} Active Tree Houses</div>
                <div>{markers.reduce((sum, m) => sum + m.listeners, 0).toLocaleString()} Total Listeners</div>
                <div>{markers.reduce((sum, m) => sum + m.activePodcasters, 0)} Active Podcasters</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Selected Marker Details */}
      {selectedMarker && (
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
          <CardContent className="p-6">
            {(() => {
              const marker = markers.find(m => m.id === selectedMarker);
              return marker ? (
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
                    {marker.country} Tree House
                  </h3>
                  <div className="flex justify-center items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-amber-600" />
                      <span>{marker.coordinates[1].toFixed(4)}°, {marker.coordinates[0].toFixed(4)}°</span>
                    </div>
                    {marker.isActive && (
                      <>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-amber-600" />
                          <span>{marker.listeners.toLocaleString()} listeners</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio className="w-4 h-4 text-amber-600" />
                          <span>{marker.activePodcasters} active podcasters</span>
                        </div>
                      </>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={() => setSelectedMarker(null)}
                  >
                    Close Details
                  </Button>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}