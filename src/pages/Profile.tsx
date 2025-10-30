import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar, Mail, Edit } from "lucide-react";

const Profile = () => {
  // Mock data - will be replaced with real user data from Lovable Cloud
  const user = {
    name: "John Doe",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    joinDate: "Joined January 2023",
    about: "Passionate software engineer with 8+ years of experience in building scalable web applications. Specialized in React, TypeScript, and cloud technologies. Always eager to learn and share knowledge with the community.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp",
        period: "2021 - Present",
        description: "Leading frontend development for enterprise SaaS products"
      },
      {
        title: "Software Engineer",
        company: "StartupXYZ",
        period: "2018 - 2021",
        description: "Built and maintained multiple web applications using modern tech stack"
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        year: "2018"
      }
    ],
    skills: [
      "React", "TypeScript", "Node.js", "Python", "AWS",
      "Docker", "PostgreSQL", "GraphQL", "CI/CD", "Agile"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-8 space-y-6">
            {/* Profile Header */}
            <Card className="shadow-soft">
              <CardContent className="p-0">
                <div className="h-32 bg-gradient-primary" />
                <div className="px-6 pb-6">
                  <div className="flex flex-col sm:flex-row gap-4 -mt-16 mb-4">
                    <Avatar className="h-32 w-32 border-4 border-card">
                      <AvatarFallback className="text-4xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 mt-16 sm:mt-20">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h1 className="text-3xl font-bold">{user.name}</h1>
                          <p className="text-lg text-muted-foreground">{user.title}</p>
                        </div>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {user.joinDate}
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold">342</div>
                      <div className="text-sm text-muted-foreground">Connections</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">1.2k</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{user.about}</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.period}</p>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Skills */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Profile Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Profile views</span>
                  <span className="text-2xl font-bold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Search appearances</span>
                  <span className="text-2xl font-bold">567</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Post impressions</span>
                  <span className="text-2xl font-bold">8,901</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
