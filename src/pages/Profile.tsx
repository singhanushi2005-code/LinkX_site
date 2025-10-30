import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar, Mail, Edit } from "lucide-react";

const Profile = () => {
  // Mock data - will be replaced with real user data from Lovable Cloud
  const user = {
    name: "Alex Johnson",
    title: "Computer Science Student • 3rd Year",
    location: "MIT, Cambridge, MA",
    email: "alex.johnson@college.edu",
    joinDate: "Joined September 2024",
    about: "Passionate computer science student with strong interest in full-stack development and AI. Active member of coding club and hackathon enthusiast. Looking for summer internship opportunities to apply my skills and learn from industry professionals.",
    experience: [
      {
        title: "Frontend Development Intern",
        company: "TechStartup Inc.",
        period: "Summer 2024",
        description: "Built responsive web components using React and TypeScript. Collaborated with design team to implement new features."
      },
      {
        title: "Teaching Assistant - Data Structures",
        company: "MIT Computer Science Department",
        period: "Fall 2024 - Present",
        description: "Assist professor in teaching data structures course. Hold office hours and grade assignments for 100+ students."
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Massachusetts Institute of Technology",
        year: "Expected 2026"
      }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Full-stack web app with React, Node.js, and MongoDB",
        link: "github.com/alexj/ecommerce"
      },
      {
        name: "AI Chatbot",
        description: "NLP-powered chatbot using Python and TensorFlow",
        link: "github.com/alexj/ai-chatbot"
      }
    ],
    skills: [
      "React", "TypeScript", "JavaScript", "Python", "Java",
      "Node.js", "MongoDB", "Git", "REST APIs", "Machine Learning"
    ],
    gpa: "3.8/4.0",
    college: "Massachusetts Institute of Technology",
    major: "Computer Science",
    year: "3rd Year"
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
                      <Briefcase className="h-4 w-4" />
                      {user.major}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {user.year}
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm text-muted-foreground">Connections</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{user.gpa}</div>
                      <div className="text-sm text-muted-foreground">GPA</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
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
                    <p className="text-sm mt-1">GPA: <span className="font-semibold">{user.gpa}</span></p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.projects?.map((project, index) => (
                  <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-foreground mt-1">{project.description}</p>
                    <a 
                      href={`https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 inline-block"
                    >
                      {project.link}
                    </a>
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
