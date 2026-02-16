import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Video, Calendar, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Feed = () => {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [connectionsCount, setConnectionsCount] = useState(0);

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles:author_id(first_name, last_name, avatar_url, major, year, college)")
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();

    // Fetch connections count
    if (user) {
      supabase
        .from("connections")
        .select("id", { count: "exact", head: true })
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .eq("status", "accepted")
        .then(({ count }) => setConnectionsCount(count || 0));
    }
  }, [fetchPosts, user]);

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;
    setPosting(true);
    const { error } = await supabase.from("posts").insert({
      author_id: user.id,
      content: newPost.trim(),
    });
    if (error) {
      toast.error("Failed to create post");
    } else {
      toast.success("Post created!");
      setNewPost("");
      fetchPosts();
    }
    setPosting(false);
  };

  const initials = profile
    ? `${(profile.first_name || "")[0] || ""}${(profile.last_name || "")[0] || ""}`
    : "?";

  const trendingTopics = [
    "#InternshipTips",
    "#StudentLife",
    "#TechCareers",
    "#CampusRecruitment",
    "#SkillDevelopment",
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
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {profile ? `${profile.first_name || ""} ${profile.last_name || ""}` : "Loading..."}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {profile ? `${profile.major} • Year ${profile.year} • ${profile.college}` : ""}
                    </p>
                  </div>
                  <div className="w-full pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connections</span>
                      <span className="font-semibold">{connectionsCount}</span>
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
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Share your thoughts..."
                      className="min-h-[100px]"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
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
                      <Button variant="hero" onClick={handlePost} disabled={posting || !newPost.trim()}>
                        {posting ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No posts yet. Be the first to share!</div>
            ) : (
              posts.map((post) => {
                const p = post.profiles;
                return (
                  <PostCard
                    key={post.id}
                    postId={post.id}
                    author={{
                      name: p ? `${p.first_name || ""} ${p.last_name || ""}` : "Unknown",
                      title: p ? `${p.major} • Year ${p.year} • ${p.college}` : "",
                      avatar: p?.avatar_url || "",
                    }}
                    content={post.content}
                    image={post.image_url}
                    timestamp={new Date(post.created_at).toLocaleDateString()}
                    likes={post.likes_count}
                    comments={post.comments_count}
                  />
                );
              })
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Suggestions for you</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Connect with more students to see suggestions here.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Feed;
