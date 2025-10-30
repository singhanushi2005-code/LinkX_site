import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Image, Video, Calendar, TrendingUp } from "lucide-react";

const Feed = () => {
  // Mock data - will be replaced with real data from Lovable Cloud
  const posts = [
    {
      author: {
        name: "Sarah Johnson",
        title: "Senior Software Engineer at TechCorp",
        avatar: ""
      },
      content: "Excited to share that I'll be speaking at the Tech Summit 2025! Looking forward to discussing the future of AI in software development. Who else is attending?",
      timestamp: "2 hours ago",
      likes: 147,
      comments: 23
    },
    {
      author: {
        name: "Michael Chen",
        title: "Product Manager | Innovation Enthusiast",
        avatar: ""
      },
      content: "Just launched our new product feature! Huge thanks to the amazing team who made this possible. Check it out and let me know what you think!",
      timestamp: "5 hours ago",
      likes: 89,
      comments: 15
    },
    {
      author: {
        name: "Emily Rodriguez",
        title: "UX Designer | Design Systems Advocate",
        avatar: ""
      },
      content: "Spent the weekend redesigning our design system. The key to great UX? Consistency, accessibility, and empathy. What are your design principles?",
      timestamp: "1 day ago",
      likes: 234,
      comments: 41
    }
  ];

  const trendingTopics = [
    "#AIRevolution",
    "#RemoteWork",
    "#Sustainability",
    "#WebDevelopment",
    "#CareerGrowth"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                  <div className="w-full pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connections</span>
                      <span className="font-semibold">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profile Views</span>
                      <span className="font-semibold">89</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="text-sm">
                    <a href="#" className="text-primary hover:underline font-medium">
                      {topic}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6 space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea 
                      placeholder="Share your thoughts..." 
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Image className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-5 w-5 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </div>
                      <Button variant="hero">Post</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Suggestions for you</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">User {i}</p>
                      <p className="text-xs text-muted-foreground truncate">Professional Title</p>
                    </div>
                    <Button variant="outline" size="sm">Follow</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Feed;
