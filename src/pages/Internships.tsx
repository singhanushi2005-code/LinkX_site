import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase } from "lucide-react";

const Internships = () => {
  // Mock data - will be replaced with real data from Lovable Cloud
  const internships = [
    {
      title: "Software Engineering Intern",
      company: "TechVision Inc.",
      location: "Remote / Hybrid",
      type: "Summer Internship",
      salary: "$20/hr - $30/hr",
      posted: "Posted 2 days ago",
      description: "Join our team as a software engineering intern. Work on real projects, learn from experienced engineers, and build your portfolio.",
      skills: ["React", "JavaScript", "Git", "Problem Solving"]
    },
    {
      title: "Product Management Intern",
      company: "InnovateCorp",
      location: "New York, NY",
      type: "6-Month Internship",
      salary: "$25/hr - $35/hr",
      posted: "Posted 3 days ago",
      description: "Learn product strategy and execution. Work with cross-functional teams on real product features. Perfect for business or CS students.",
      skills: ["Communication", "Data Analysis", "User Research", "Agile"]
    },
    {
      title: "UX/UI Design Intern",
      company: "DesignHub",
      location: "Remote",
      type: "Part-time Internship",
      salary: "$18/hr - $25/hr",
      posted: "Posted 1 week ago",
      description: "Create beautiful interfaces for web and mobile. Build your design portfolio while learning industry best practices.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"]
    },
    {
      title: "Data Science Intern",
      company: "DataCorp",
      location: "San Francisco, CA",
      type: "Summer Internship",
      salary: "$30/hr - $40/hr",
      posted: "Posted 5 days ago",
      description: "Work with real datasets, build machine learning models, and present insights to stakeholders. Great for CS/Statistics students.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"]
    },
    {
      title: "Marketing Intern",
      company: "BrandWorks",
      location: "Austin, TX",
      type: "3-Month Internship",
      salary: "$15/hr - $22/hr",
      posted: "Posted 4 days ago",
      description: "Help create and execute marketing campaigns. Learn digital marketing, content creation, and social media strategy.",
      skills: ["Content Writing", "Social Media", "SEO", "Analytics"]
    },
    {
      title: "Full Stack Development Intern",
      company: "StartupXYZ",
      location: "Remote",
      type: "Summer Internship",
      salary: "$22/hr - $32/hr",
      posted: "Posted 1 week ago",
      description: "Build features from frontend to backend. Work in a fast-paced startup environment and ship code to production.",
      skills: ["Node.js", "React", "MongoDB", "REST APIs"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <Card className="shadow-soft">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Filters</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Internship Type</label>
                      <div className="space-y-2">
                        {["Summer", "Part-time", "Full-time", "Remote"].map((type) => (
                          <label key={type} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Field of Study</label>
                      <div className="space-y-2">
                        {["Computer Science", "Business", "Design", "Engineering", "Marketing"].map((field) => (
                          <label key={field} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {field}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Duration</label>
                      <div className="space-y-2">
                        {["1-3 months", "3-6 months", "6+ months"].map((duration) => (
                          <label key={duration} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {duration}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Stipend Range</label>
                      <div className="space-y-2">
                        {["$0 - $20/hr", "$20 - $30/hr", "$30 - $40/hr", "$40+/hr"].map((range) => (
                          <label key={range} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {range}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search internships by title or skills..." 
                      className="pl-10"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Location..." 
                      className="pl-10"
                    />
                  </div>
                  <Button variant="hero">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {internships.length} Internships Available
                </h2>
                <p className="text-sm text-muted-foreground">Curated opportunities for college students</p>
              </div>
            </div>

            <div className="grid gap-6">
              {internships.map((internship, index) => (
                <JobCard key={index} {...internship} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Internships;
