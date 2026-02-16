import { useState, useEffect } from "react";
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Internships = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      let query = supabase
        .from("internships")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = await query;
      if (!error) setInternships(data || []);
      setLoading(false);
    };
    fetchInternships();
  }, []);

  const handleApply = async (internshipId: string) => {
    if (!user) return;
    const { error } = await supabase.from("applications").insert({
      internship_id: internshipId,
      student_id: user.id,
    });
    if (error) {
      if (error.code === "23505") toast.error("You've already applied to this internship");
      else toast.error("Failed to apply");
    } else {
      toast.success("Application submitted!");
    }
  };

  const filtered = internships.filter((i) => {
    const matchesSearch = !searchQuery || i.title.toLowerCase().includes(searchQuery.toLowerCase()) || (i.skills_required || []).some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !locationQuery || i.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <main className="max-w-5xl mx-auto space-y-6">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search internships by title or skills..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location..."
                    className="pl-10"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold">
              {filtered.length} Internship{filtered.length !== 1 ? "s" : ""} Available
            </h2>
            <p className="text-sm text-muted-foreground">Curated opportunities for college students</p>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading internships...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No internships found.</div>
          ) : (
            <div className="grid gap-6">
              {filtered.map((internship) => (
                <JobCard
                  key={internship.id}
                  title={internship.title}
                  company={internship.company_name}
                  location={internship.location}
                  type={internship.type}
                  salary={internship.stipend || undefined}
                  posted={new Date(internship.created_at).toLocaleDateString()}
                  description={internship.description}
                  skills={internship.skills_required || []}
                  onApply={() => handleApply(internship.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Internships;
