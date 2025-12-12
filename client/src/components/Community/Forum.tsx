import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Users, 
  Clock, 
  Heart, 
  Share2, 
  Search,
  Plus,
  Pin,
  Bookmark,
  TrendingUp,
  Globe,
  Languages
} from 'lucide-react';

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState('');

  const forumCategories = [
    {
      id: 'cultural-exchange',
      name: 'Cultural Exchange',
      description: 'Share stories and traditions from your culture',
      topics: 234,
      posts: 1847,
      icon: '🌍',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: 'storytelling',
      name: 'Traditional Storytelling',
      description: 'Ancient wisdom and oral traditions',
      topics: 189,
      posts: 1456,
      icon: '📚',
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      id: 'language-learning',
      name: 'Language Learning',
      description: 'Practice and teach languages',
      topics: 156,
      posts: 892,
      icon: '🗣️',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 'tech-help',
      name: 'Technical Support',
      description: 'Help with podcasting and platform features',
      topics: 98,
      posts: 567,
      icon: '🔧',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      description: 'Find partners for podcast projects',
      topics: 123,
      posts: 734,
      icon: '🤝',
      color: 'bg-pink-50 border-pink-200 text-pink-800'
    }
  ];

  const recentTopics = [
    {
      id: 'topic-001',
      title: 'Traditional Maasai Wedding Ceremonies',
      author: 'Amara Kikwete',
      country: 'Tanzania',
      category: 'Cultural Exchange',
      replies: 23,
      likes: 156,
      lastActivity: '2 hours ago',
      isPinned: true,
      tags: ['Culture', 'Traditions', 'Ceremonies'],
      preview: 'I\'d love to share the beautiful traditions of Maasai wedding ceremonies and hear about wedding traditions from other cultures...'
    },
    {
      id: 'topic-002',
      title: 'Learning Swahili Through Stories',
      author: 'Joseph Mwangi',
      country: 'Kenya',
      category: 'Language Learning',
      replies: 18,
      likes: 89,
      lastActivity: '4 hours ago',
      isPinned: false,
      tags: ['Swahili', 'Stories', 'Learning'],
      preview: 'Has anyone tried learning Swahili through traditional stories? I find it much more engaging than textbooks...'
    },
    {
      id: 'topic-003',
      title: 'Best Microphones for Outdoor Recording',
      author: 'Sarah Chen',
      country: 'Singapore',
      category: 'Technical Support',
      replies: 31,
      likes: 127,
      lastActivity: '6 hours ago',
      isPinned: false,
      tags: ['Equipment', 'Recording', 'Audio'],
      preview: 'I\'m planning to record some nature-based storytelling outdoors. What microphones would you recommend...'
    },
    {
      id: 'topic-004',
      title: 'Cross-Cultural Collaboration Opportunity',
      author: 'Maria Santos',
      country: 'Brazil',
      category: 'Collaboration',
      replies: 12,
      likes: 67,
      lastActivity: '8 hours ago',
      isPinned: false,
      tags: ['Collaboration', 'International', 'Stories'],
      preview: 'Looking for storytellers from different continents to create a series about universal human experiences...'
    },
    {
      id: 'topic-005',
      title: 'Ancient Baobab Tree Legends',
      author: 'Kwame Asante',
      country: 'Ghana',
      category: 'Traditional Storytelling',
      replies: 45,
      likes: 234,
      lastActivity: '12 hours ago',
      isPinned: true,
      tags: ['Baobab', 'Legends', 'Ancient'],
      preview: 'Every culture seems to have legends about the mighty baobab tree. Let\'s collect these stories from around the world...'
    }
  ];

  const trendingTags = [
    { tag: 'Cultural-Exchange', count: 89 },
    { tag: 'Traditional-Stories', count: 67 },
    { tag: 'Language-Learning', count: 45 },
    { tag: 'Baobab-Legends', count: 34 },
    { tag: 'Collaboration', count: 28 },
    { tag: 'Audio-Tips', count: 23 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
            Community Forum
          </h2>
          <p className="text-amber-600 dark:text-amber-200">
            Connect, share, and learn with storytellers worldwide
          </p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          New Topic
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search topics, categories, or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-amber-200 dark:border-gray-600 focus:border-amber-400"
          />
        </div>
        <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
          Filter
        </Button>
      </div>

      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="topics">Recent Topics</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-4">
          {recentTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {topic.isPinned && (
                        <Pin className="w-4 h-4 text-amber-600" />
                      )}
                      <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 hover:text-amber-600 cursor-pointer">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {topic.preview}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {topic.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-amber-100 text-amber-800">
                          {topic.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="font-medium text-amber-900 dark:text-amber-100">{topic.author}</span>
                        <span className="text-muted-foreground ml-1">• {topic.country}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {topic.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {topic.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {topic.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {topic.lastActivity}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forumCategories.map((category) => (
              <Card key={category.id} className={`hover:shadow-md transition-shadow cursor-pointer ${category.color} border-2`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm opacity-80">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{category.topics} topics</span>
                    <span>{category.posts} posts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTags.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 cursor-pointer transition-colors">
                      <span className="font-medium text-amber-900 dark:text-amber-100">#{item.tag}</span>
                      <Badge variant="secondary">{item.count} posts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Global Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm font-medium">Active Users</span>
                    <span className="text-lg font-bold text-blue-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium">Countries Active</span>
                    <span className="text-lg font-bold text-green-600">67</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-sm font-medium">Languages</span>
                    <span className="text-lg font-bold text-purple-600">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-posts" className="space-y-4">
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No posts yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Start engaging with the community by creating your first post
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}