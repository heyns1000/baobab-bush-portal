import { useState } from 'react';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import Forum from "@/components/Community/Forum";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Globe, 
  Calendar,
  Award,
  Heart,
  Handshake,
  BookOpen,
  Mic,
  Languages,
  Share2,
  UserPlus,
  Bell,
  Settings
} from 'lucide-react';

export default function Community() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const communityStats = {
    totalMembers: 15647,
    activeToday: 1247,
    countriesRepresented: 89,
    languagesSpoken: 156,
    storiesShared: 8934,
    collaborationsActive: 234
  };

  const featuredMembers = [
    {
      name: "Amara Kikwete",
      title: "Traditional Wisdom Keeper",
      country: "Tanzania",
      specialties: ["Maasai Stories", "Oral History"],
      followers: 12400,
      badge: "Cultural Ambassador",
      avatar: "AK",
      isOnline: true
    },
    {
      name: "Kwame Asante",
      title: "Griot Master",
      country: "Ghana",
      specialties: ["West African Folklore", "Music"],
      followers: 18900,
      badge: "Master Storyteller",
      avatar: "KA",
      isOnline: true
    },
    {
      name: "Maria Santos",
      title: "Cultural Bridge Builder",
      country: "Brazil",
      specialties: ["Latin American Culture", "Collaboration"],
      followers: 9800,
      badge: "Community Connector",
      avatar: "MS",
      isOnline: false
    },
    {
      name: "Ravi Krishnamurthy",
      title: "Ancient Wisdom Keeper",
      country: "India",
      specialties: ["Sanskrit Stories", "Philosophy"],
      followers: 14200,
      badge: "Wisdom Keeper",
      avatar: "RK",
      isOnline: true
    }
  ];

  const upcomingEvents = [
    {
      id: 'event-001',
      title: 'Global Storytelling Exchange',
      date: '2024-02-15',
      time: '19:00 UTC',
      description: 'Monthly gathering where storytellers from different cultures share traditional tales.',
      attendees: 234,
      host: 'BushPortal Community',
      category: 'Cultural Exchange'
    },
    {
      id: 'event-002',
      title: 'Baobab Tree Legends Workshop',
      date: '2024-02-18',
      time: '16:00 UTC',
      description: 'Interactive workshop collecting and sharing baobab tree legends from around the world.',
      attendees: 89,
      host: 'Kwame Asante',
      category: 'Workshop'
    },
    {
      id: 'event-003',
      title: 'Language Learning Circle: Swahili',
      date: '2024-02-20',
      time: '18:00 UTC',
      description: 'Practice Swahili through traditional stories and conversations with native speakers.',
      attendees: 67,
      host: 'Amara Kikwete',
      category: 'Language Learning'
    }
  ];

  const collaborativeProjects = [
    {
      id: 'proj-001',
      title: 'Universal Creation Myths',
      description: 'Collecting creation stories from all continents to explore common themes.',
      participants: 23,
      countries: 15,
      progress: 65,
      category: 'Research',
      status: 'Active'
    },
    {
      id: 'proj-002',
      title: 'Children\'s Stories Across Cultures',
      description: 'Creating a multilingual collection of children\'s stories from different cultures.',
      participants: 18,
      countries: 12,
      progress: 42,
      category: 'Content Creation',
      status: 'Active'
    },
    {
      id: 'proj-003',
      title: 'Endangered Languages Documentation',
      description: 'Recording and preserving stories in endangered languages.',
      participants: 31,
      countries: 8,
      progress: 78,
      category: 'Preservation',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      <Header onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          dataSourceStatuses={[]}
        />
        
        <main className="flex-1 ml-64 transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="text-5xl mr-4">🤝</div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Global Community
                  </h1>
                  <p className="text-xl text-amber-600 dark:text-amber-200">
                    Connect, Collaborate, and Share Stories Worldwide
                  </p>
                </div>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-amber-600">{communityStats.totalMembers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-green-600">{communityStats.activeToday}</div>
                  <div className="text-xs text-muted-foreground">Active Today</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-blue-600">{communityStats.countriesRepresented}</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-purple-600">{communityStats.languagesSpoken}</div>
                  <div className="text-xs text-muted-foreground">Languages</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-red-600">{communityStats.storiesShared}</div>
                  <div className="text-xs text-muted-foreground">Stories</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-amber-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-indigo-600">{communityStats.collaborationsActive}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="forum" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="forum">Community Forum</TabsTrigger>
                <TabsTrigger value="members">Featured Members</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="projects">Collaborations</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="forum">
                <Forum />
              </TabsContent>

              <TabsContent value="members" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                    Featured Community Members
                  </h2>
                  <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow Members
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredMembers.map((member, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <Avatar className="w-16 h-16 border-2 border-amber-200">
                              <AvatarFallback className="bg-amber-100 text-amber-800 text-lg font-bold">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-amber-900 dark:text-amber-100">{member.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {member.badge}
                              </Badge>
                            </div>
                            <p className="text-sm text-amber-600 dark:text-amber-200 mb-1">{member.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {member.country}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Specialties</div>
                            <div className="flex flex-wrap gap-1">
                              {member.specialties.map((specialty, sIdx) => (
                                <Badge key={sIdx} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm">
                              <span className="font-medium">{member.followers.toLocaleString()}</span>
                              <span className="text-muted-foreground"> followers</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50">
                                <UserPlus className="w-4 h-4 mr-1" />
                                Follow
                              </Button>
                              <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                    Upcoming Community Events
                  </h2>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {event.date} at {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.attendees} attending
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {event.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Join Event
                            </Button>
                            <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Hosted by <span className="font-medium">{event.host}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                    Collaborative Projects
                  </h2>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Handshake className="w-4 h-4 mr-2" />
                    Start Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborativeProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                              {project.title}
                            </h3>
                            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {project.category}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-amber-100 dark:bg-amber-900/30 rounded-full h-2">
                            <div 
                              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project.participants} participants
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-4 h-4" />
                              {project.countries} countries
                            </span>
                          </div>

                          <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Join Project
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Community Resources
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Guides, tools, and materials to help you engage with the global community
                  </p>
                </div>
                {/* Resources content would go here */}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}