import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { TreePine, Globe, Users, Radio, Play, ArrowRight, Star, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      {/* Premium Navigation Bar */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-amber-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TreePine className="w-8 h-8 text-amber-600" />
              <div>
                <h1 className="text-xl font-bold text-amber-900 dark:text-amber-100">BushPortal™</h1>
                <p className="text-xs text-amber-600 dark:text-amber-300">Global Podcast Network</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/tree-houses">
                <Button variant="ghost" className="text-amber-700 hover:text-amber-900 hover:bg-amber-50">
                  Tree Houses
                </Button>
              </Link>
              <Link href="/live-podcasts">
                <Button variant="ghost" className="text-amber-700 hover:text-amber-900 hover:bg-amber-50">
                  Live Podcasts
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section - Amazon-style */}
        <div className="relative overflow-hidden">
          <div className="text-center mb-20">
            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Apache Licensed
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200 px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                120+ Countries
              </Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Premium Network
              </Badge>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="text-7xl mr-6">🌳</div>
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold text-amber-900 dark:text-amber-100 mb-4 leading-tight">
                  BushPortal™
                </h1>
                <p className="text-2xl lg:text-3xl text-amber-700 dark:text-amber-300 font-medium">
                  Digital Tree Houses for Global Podcasters
                </p>
              </div>
            </div>
            
            <p className="text-xl text-amber-600 dark:text-amber-200 max-w-4xl mx-auto mb-12 leading-relaxed">
              The world's premier podcasting network connecting storytellers across 120 countries. 
              From African savannas to global destinations - where every baobab tree hosts a thriving community of creators.
            </p>
            
            {/* Amazon-style action buttons */}
            <div className="flex gap-6 justify-center flex-wrap mb-12">
              <Link href="/tree-houses">
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <TreePine className="w-6 h-6 mr-3" />
                  Explore Tree Houses
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link href="/live-podcasts">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Radio className="w-6 h-6 mr-3" />
                  Listen Live Now
                  <Play className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-amber-200 dark:border-gray-700 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">247</div>
                  <div className="text-sm text-muted-foreground">Active Storytellers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">156K</div>
                  <div className="text-sm text-muted-foreground">Global Listeners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">3.4K</div>
                  <div className="text-sm text-muted-foreground">Episodes Published</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">23</div>
                  <div className="text-sm text-muted-foreground">Languages Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Amazon-style product showcase */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-6">
              Why Choose BushPortal™?
            </h2>
            <p className="text-xl text-amber-600 dark:text-amber-200 max-w-3xl mx-auto">
              Professional-grade podcasting infrastructure trusted by creators worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    🎙️
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      Global Podcast Network
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">Enterprise Grade</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Connect with 120+ digital tree houses across the globe, each hosting unique podcasting communities with professional-grade infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    🌍
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      From Here to Timbuktu
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">Global Reach</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Every baobab location tells a story - from African savannas to global destinations, connecting diverse cultures through authentic storytelling.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    🏠
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      Digital Tree Houses
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">Interactive Studios</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Interactive podcast studios in the canopy - collaborate with podcasters from around the world in our premium virtual environments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    📻
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      Cross-Cultural Stories
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">23 Languages</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Share stories that bridge cultures and connect communities across continents with our advanced translation and cultural exchange features.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    🌱
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      Community Growth
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">Scalable Platform</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Watch your podcasting community grow like a mighty baobab tree, with deep roots and wide reach through our growth-focused tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                    🎵
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-amber-900 dark:text-amber-100">
                      Audio Adventures
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">HD Quality</Badge>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  Create immersive audio experiences that transport listeners to amazing places and stories with our premium audio processing technology.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Call to Action - Amazon-style conversion section */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Join 247 storytellers from 120 countries who trust BushPortal™ to connect communities 
              and share authentic voices from every corner of the world.
            </p>
            
            <div className="flex gap-6 justify-center flex-wrap">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-amber-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="w-6 h-6 mr-3" />
                  Start Your Journey Free
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link href="/tree-houses">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-12 py-4 text-lg font-semibold transition-all duration-300"
                >
                  <TreePine className="w-6 h-6 mr-3" />
                  Explore First
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-sm opacity-75">
              Licensed under Apache License v2.0 by <span className="font-semibold">Fruitful Holdings (Pty) Ltd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
