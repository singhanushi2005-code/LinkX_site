import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Send,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";

const PlacementCell = () => {
  // Mock data - will be replaced with real data from Lovable Cloud
  const placementOfficers = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Head - Placement Cell",
      email: "sarah.mitchell@college.edu",
      phone: "+1 (555) 123-4567",
      avatar: ""
    },
    {
      name: "Prof. David Chen",
      role: "Assistant Placement Officer",
      email: "david.chen@college.edu",
      phone: "+1 (555) 234-5678",
      avatar: ""
    }
  ];

  const upcomingEvents = [
    {
      title: "Tech Giants Career Fair",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      companies: ["Google", "Microsoft", "Amazon", "Meta"]
    },
    {
      title: "Resume Review Workshop",
      date: "March 8, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Career Center Room 201",
      companies: []
    },
    {
      title: "Mock Interview Sessions",
      date: "March 12, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Career Center",
      companies: []
    }
  ];

  const stats = [
    { label: "Placement Rate", value: "94%", icon: TrendingUp },
    { label: "Partner Companies", value: "250+", icon: Users },
    { label: "Avg Response Time", value: "24hrs", icon: Clock }
  ];

  const resources = [
    "Resume Templates",
    "Interview Preparation Guide",
    "Company-wise Previous Questions",
    "Coding Practice Resources",
    "Aptitude Test Materials",
    "Soft Skills Development"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Placement Cell</h1>
            <p className="text-xl text-muted-foreground">
              Your direct connection to career opportunities and guidance
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Placement Officers */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Contact Placement Cell</CardTitle>
                  <CardDescription>
                    Reach out to our placement officers for guidance and support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {placementOfficers.map((officer, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={officer.avatar} />
                        <AvatarFallback className="text-lg">
                          {officer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{officer.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{officer.role}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {officer.email}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {officer.phone}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Message */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Send a Quick Message</CardTitle>
                  <CardDescription>
                    Have a question? Send it directly to the placement cell
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="e.g., Resume Review Request" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here..."
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="hero" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardFooter>
              </Card>

              {/* Upcoming Events */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-soft transition-smooth">
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      {event.companies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.companies.map((company, idx) => (
                            <Badge key={idx} variant="secondary">{company}</Badge>
                          ))}
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="w-full">
                        Register for Event
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Resources */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {resources.map((resource, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="w-full justify-start"
                    >
                      {resource}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft bg-gradient-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <h3 className="font-semibold mb-2">Need Career Guidance?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Schedule a one-on-one session with our placement officers
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementCell;
