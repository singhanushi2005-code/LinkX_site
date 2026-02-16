import { useState, useEffect } from "react";
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
  Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const PlacementCell = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [officers, setOfficers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: eventsData } = await supabase
        .from("placement_events")
        .select("*")
        .order("event_date", { ascending: true });
      setEvents(eventsData || []);

      const { data: officersData } = await supabase
        .from("placement_officers")
        .select("*, profiles:user_id(first_name, last_name, avatar_url, email)")
        .limit(5);
      setOfficers(officersData || []);
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Placement Rate", value: "94%", icon: TrendingUp },
    { label: "Partner Companies", value: "250+", icon: Users },
    { label: "Avg Response Time", value: "24hrs", icon: Clock },
  ];

  const resources = [
    "Resume Templates",
    "Interview Preparation Guide",
    "Company-wise Previous Questions",
    "Coding Practice Resources",
    "Aptitude Test Materials",
    "Soft Skills Development",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Placement Cell</h1>
            <p className="text-xl text-muted-foreground">Your direct connection to career opportunities and guidance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{stat.value}</p>
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
            <div className="lg:col-span-2 space-y-6">
              {/* Officers */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Contact Placement Cell</CardTitle>
                  <CardDescription>Reach out to our placement officers for guidance and support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {officers.length === 0 && <p className="text-muted-foreground text-sm">No placement officers found.</p>}
                  {officers.map((officer) => {
                    const p = officer.profiles;
                    return (
                      <div key={officer.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={p?.avatar_url || ""} />
                          <AvatarFallback className="text-lg">
                            {p ? `${(p.first_name || "?")[0]}${(p.last_name || "")[0] || ""}` : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{p ? `${p.first_name || ""} ${p.last_name || ""}` : "Officer"}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{officer.department}</p>
                          <div className="space-y-1 text-sm">
                            {p?.email && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4" /> {p.email}
                              </div>
                            )}
                            {officer.phone && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" /> {officer.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Events */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.length === 0 && <p className="text-muted-foreground text-sm">No upcoming events.</p>}
                  {events.map((event) => (
                    <div key={event.id} className="p-4 rounded-lg border bg-card hover:shadow-soft transition-smooth">
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.event_date).toLocaleDateString()}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> {event.location}
                          </div>
                        )}
                      </div>
                      <p className="text-sm mb-3">{event.description}</p>
                      {event.registration_link && (
                        <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full">Register for Event</Button>
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

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
                    <Button key={index} variant="ghost" className="w-full justify-start">{resource}</Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader><CardTitle>Office Hours</CardTitle></CardHeader>
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
                  <p className="text-sm opacity-90 mb-4">Schedule a one-on-one session with our placement officers</p>
                  <Button variant="secondary" size="sm" className="w-full">Book Appointment</Button>
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
