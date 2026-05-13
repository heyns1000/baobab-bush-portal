import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import locationsData from "@shared/locations.json";

interface Location {
  id: string;
  name: string;
  country: string;
  coords: number[];
  frequency: string;
}

interface Region {
  name: string;
  flag: string;
  color: string;
  accent: string;
  locations: Location[];
}

interface LocationSelectorProps {
  onSelectLocation?: (location: Location & { region: string }) => void;
  selectedLocations?: string[];
  maxSelections?: number;
}

export default function LocationSelector({ 
  onSelectLocation, 
  selectedLocations = [], 
  maxSelections = 5 
}: LocationSelectorProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const regions = locationsData.regions as Record<string, Region>;

  const filteredRegions = Object.entries(regions).filter(([_, region]) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    region.locations.some(location => 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getFilteredLocations = (region: Region) => {
    if (!searchTerm) return region.locations;
    return region.locations.filter(location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleLocationSelect = (location: Location, regionKey: string) => {
    if (selectedLocations.includes(location.id)) return;
    if (selectedLocations.length >= maxSelections) return;
    
    onSelectLocation?.({
      ...location,
      region: regionKey
    });
  };

  return (
    <div className="space-y-6">
      {/* Search & Header */}
      <div className="text-center space-y-4">
        <div className="parchment-texture rounded-lg p-6 border border-amber-400/30">
          <h2 className="text-3xl font-bold text-amber-200 mb-2">🌍 Global Frequency Network</h2>
          <p className="text-amber-300/80 mb-4">Select sovereign signal transmission points across the Earth</p>
          
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search locations or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-amber-900/20 border border-amber-400/40 rounded-lg text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              data-testid="location-search"
            />
          </div>
        </div>

        {/* Selection Counter */}
        <div className="flex items-center justify-center space-x-4">
          <Badge variant="outline" className="bg-amber-900/30 border-amber-400 text-amber-200">
            Selected: {selectedLocations.length}/{maxSelections}
          </Badge>
          {selectedLocations.length > 0 && (
            <Badge variant="outline" className="bg-green-900/30 border-green-400 text-green-200">
              🔗 Network Active
            </Badge>
          )}
        </div>
      </div>

      {/* Region Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRegions.map(([regionKey, region]) => {
          const filteredLocations = getFilteredLocations(region);
          const isActive = activeRegion === regionKey;
          const selectedInRegion = region.locations.filter(loc => selectedLocations.includes(loc.id)).length;

          return (
            <Card 
              key={regionKey}
              className={`transition-all duration-300 cursor-pointer transform hover:scale-[1.02] border-2 ${
                isActive 
                  ? 'border-amber-400 shadow-2xl bg-gradient-to-br from-amber-900/20 to-stone-900/20' 
                  : 'border-amber-400/30 hover:border-amber-400/60 bg-gradient-to-br from-stone-900/40 to-amber-900/10'
              }`}
              style={{
                boxShadow: isActive ? `0 0 30px ${region.accent}40` : undefined
              }}
              onClick={() => setActiveRegion(isActive ? null : regionKey)}
              data-testid={`region-${regionKey}`}
            >
              <CardHeader className="pb-3">
                <CardTitle 
                  className="flex items-center justify-between text-amber-200"
                  style={{ color: region.accent }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{region.flag}</span>
                    <span className="font-bold">{region.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedInRegion > 0 && (
                      <Badge 
                        className="text-xs" 
                        style={{ backgroundColor: `${region.color}40`, color: region.accent, borderColor: region.color }}
                      >
                        {selectedInRegion} ✓
                      </Badge>
                    )}
                    <div 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isActive ? 'animate-pulse' : ''
                      }`}
                      style={{ backgroundColor: region.color }}
                    />
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-sm text-amber-300/70 mb-3">
                  {filteredLocations.length} transmission point{filteredLocations.length !== 1 ? 's' : ''} available
                </div>

                {isActive && (
                  <div className="space-y-2 animate-in slide-in-from-top duration-300">
                    <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-amber-400/20">
                      {filteredLocations.map((location) => {
                        const isSelected = selectedLocations.includes(location.id);
                        const canSelect = !isSelected && selectedLocations.length < maxSelections;

                        return (
                          <button
                            key={location.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (canSelect) {
                                handleLocationSelect(location, regionKey);
                              }
                            }}
                            disabled={!canSelect && !isSelected}
                            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                              isSelected
                                ? 'border-green-400 bg-green-900/30 text-green-200'
                                : canSelect
                                ? 'border-amber-400/40 hover:border-amber-400 hover:bg-amber-900/20 text-amber-100 hover:text-amber-200'
                                : 'border-gray-600/40 text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                            data-testid={`location-${location.id}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{location.name}</div>
                                <div className="text-xs opacity-75">{location.country}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-mono">{location.frequency} FM</div>
                                <div className="text-xs opacity-60">
                                  {location.coords[0]?.toFixed(2)}°, {location.coords[1]?.toFixed(2)}°
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="flex items-center mt-2 text-xs text-green-300">
                                <span className="mr-1">✓</span>
                                <span>Signal Locked</span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!isActive && (
                  <div className="text-center py-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-amber-300 hover:text-amber-200 text-xs"
                      style={{ color: region.accent }}
                    >
                      Click to explore {filteredLocations.length} locations
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRegions.length === 0 && (
        <div className="text-center py-16 parchment-texture rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-amber-300/70 text-lg">No locations found</p>
          <p className="text-amber-400/50 text-sm mt-2">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}