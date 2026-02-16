import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar, Mail, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    skills: "",
    gpa: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        bio: profile.bio || "",
        skills: (profile.skills || []).join(", "),
        gpa: profile.gpa?.toString() || "",
        linkedin_url: profile.linkedin_url || "",
        github_url: profile.github_url || "",
        portfolio_url: profile.portfolio_url || "",
      });
    }
    if (user) {
      supabase
        .from("connections")
        .select("id", { count: "exact", head: true })
        .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .eq("status", "accepted")
        .then(({ count }) => setConnectionsCount(count || 0));
    }
  }, [profile, user]);

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        bio: formData.bio,
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
        gpa: formData.gpa ? parseFloat(formData.gpa) : null,
        linkedin_url: formData.linkedin_url || null,
        github_url: formData.github_url || null,
        portfolio_url: formData.portfolio_url || null,
      })
      .eq("id", user.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated!");
      setEditing(false);
      refreshProfile();
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20 text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Student";
  const initials = `${(profile.first_name || "?")[0]}${(profile.last_name || "")[0] || ""}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Profile Header */}
            <Card className="shadow-soft">
              <CardContent className="p-0">
                <div className="h-32 bg-gradient-primary" />
                <div className="px-6 pb-6">
                  <div className="flex flex-col sm:flex-row gap-4 -mt-16 mb-4">
                    <Avatar className="h-32 w-32 border-4 border-card">
                      <AvatarImage src={profile.avatar_url || ""} />
                      <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 mt-16 sm:mt-20">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h1 className="text-3xl font-bold">{fullName}</h1>
                          <p className="text-lg text-muted-foreground">
                            {profile.major} • Year {profile.year}
                          </p>
                        </div>
                        <Dialog open={editing} onOpenChange={setEditing}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>First Name</Label>
                                  <Input value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Last Name</Label>
                                  <Input value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Bio</Label>
                                <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label>Skills (comma-separated)</Label>
                                <Input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} placeholder="React, Python, SQL" />
                              </div>
                              <div className="space-y-2">
                                <Label>GPA</Label>
                                <Input value={formData.gpa} onChange={(e) => setFormData({ ...formData, gpa: e.target.value })} type="number" step="0.1" max="4.0" />
                              </div>
                              <div className="space-y-2">
                                <Label>LinkedIn URL</Label>
                                <Input value={formData.linkedin_url} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label>GitHub URL</Label>
                                <Input value={formData.github_url} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                <Label>Portfolio URL</Label>
                                <Input value={formData.portfolio_url} onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })} />
                              </div>
                              <Button variant="hero" className="w-full" onClick={handleSave}>Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.college}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {profile.major}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Year {profile.year}
                    </div>
                  </div>
                  <div className="flex gap-6 pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold">{connectionsCount}</div>
                      <div className="text-sm text-muted-foreground">Connections</div>
                    </div>
                    {profile.gpa && (
                      <div>
                        <div className="text-2xl font-bold">{profile.gpa}/4.0</div>
                        <div className="text-sm text-muted-foreground">GPA</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            {profile.bio && (
              <Card className="shadow-soft">
                <CardHeader><CardTitle>About</CardTitle></CardHeader>
                <CardContent><p className="text-foreground">{profile.bio}</p></CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="shadow-soft">
              <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills || []).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                  {(!profile.skills || profile.skills.length === 0) && (
                    <p className="text-sm text-muted-foreground">No skills added yet. Edit your profile to add skills.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {(profile.linkedin_url || profile.github_url || profile.portfolio_url) && (
              <Card className="shadow-soft">
                <CardHeader><CardTitle>Links</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">LinkedIn</a>
                  )}
                  {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">GitHub</a>
                  )}
                  {profile.portfolio_url && (
                    <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">Portfolio</a>
                  )}
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
