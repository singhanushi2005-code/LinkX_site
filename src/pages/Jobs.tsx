import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase } from "lucide-react";

const Jobs = () => {
  // Mock data - will be replaced with real data from Lovable Cloud
  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechVision Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      posted: "Posted 2 days ago",
      description: "We're looking for an experienced frontend developer to join our team and help build the next generation of web applications.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      title: "Product Manager",
      company: "InnovateCorp",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $160k",
      posted: "Posted 3 days ago",
      description: "Lead product strategy and execution for our flagship SaaS platform. Work with cross-functional teams to deliver exceptional user experiences.",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"]
    },
    {
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "Remote",
      type: "Contract",
      salary: "$90k - $120k",
      posted: "Posted 1 week ago",
      description: "Create beautiful, intuitive interfaces for web and mobile applications. Collaborate with developers and stakeholders to bring designs to life.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
    },
    {
      title: "DevOps Engineer",
      company: "CloudScale Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $150k",
      posted: "Posted 5 days ago",
      description: "Build and maintain our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability at scale.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
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
                      <label className="text-sm font-medium mb-2 block">Job Type</label>
                      <div className="space-y-2">
                        {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                          <label key={type} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Experience Level</label>
                      <div className="space-y-2">
                        {["Entry Level", "Mid Level", "Senior", "Lead"].map((level) => (
                          <label key={level} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {level}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Salary Range</label>
                      <div className="space-y-2">
                        {["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"].map((range) => (
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
                      placeholder="Search jobs..." 
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
              <h2 className="text-2xl font-bold">
                {jobs.length} Jobs Found
              </h2>
            </div>

            <div className="grid gap-6">
              {jobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
