import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  posted: string;
  description: string;
  skills: string[];
  onApply?: () => void;
}

const JobCard = ({ title, company, location, type, salary, posted, description, skills, onApply }: JobCardProps) => {
  return (
    <Card className="shadow-soft hover:shadow-glow transition-smooth">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-muted-foreground font-medium">{company}</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {type}
          </div>
          {salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {salary}
            </div>
          )}
        </div>

        <p className="text-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">{posted}</p>
      </CardContent>

      <CardFooter className="gap-2">
        <Button variant="hero" className="flex-1" onClick={onApply}>
          Apply Now
        </Button>
        <Button variant="outline" className="flex-1">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
