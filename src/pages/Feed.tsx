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
        name: "Sarah Chen",
        title: "CS Major • 4th Year • Stanford University",
        avatar: ""
      },
      content: "Just got an internship offer from Google! 🎉 All those leetcode problems and mock interviews finally paid off. Happy to share my preparation strategy with anyone who needs it. Never give up!",
      timestamp: "2 hours ago",
      likes: 247,
      comments: 43
    },
    {
      author: {
        name: "Michael Rodriguez",
        title: "Business Major • 3rd Year • MIT",
        avatar: ""
      },
      content: "Attended an amazing workshop by the placement cell today on negotiating internship offers. Pro tip: Always ask about learning opportunities, not just compensation. Who else attended?",
      timestamp: "5 hours ago",
      likes: 156,
      comments: 28
    },
    {
      author: {
        name: "Emily Taylor",
        title: "Design Major • 2nd Year • RISD",
        avatar: ""
      },
      content: "Working on my portfolio this weekend. Remember: Quality over quantity! 3-4 strong projects that show your process are better than 10 mediocre ones. What projects are you most proud of?",
      timestamp: "1 day ago",
      likes: 189,
      comments: 35
    }
  ];

  const trendingTopics = [
    "#InternshipTips",
    "#StudentLife",
    "#TechCareers",
    "#CampusRecruitment",
    "#SkillDevelopment"
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
                    <h3 className="font-semibold">Alex Johnson</h3>
                    <p className="text-sm text-muted-foreground">CS Major • 3rd Year • MIT</p>
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
