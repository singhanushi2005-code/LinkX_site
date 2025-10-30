import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-network.jpg";
import Header from "@/components/Header";

const Landing = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Connect with Placement Cell",
      description: "Direct communication with your college placement office for guidance and opportunities"
    },
    {
      icon: Briefcase,
      title: "Find Internships",
      description: "Discover internship opportunities matched to your skills and academic background"
    },
    {
      icon: TrendingUp,
      title: "Showcase Your Skills",
      description: "Build your profile highlighting projects, skills, and achievements to stand out"
    },
    {
      icon: MessageSquare,
      title: "Network with Peers",
      description: "Connect with fellow students, share experiences, and learn from each other"
    },
    {
      icon: Shield,
      title: "Student-Verified Platform",
      description: "Exclusive community for verified college students ensuring authentic connections"
    },
    {
      icon: Zap,
      title: "Quick Applications",
      description: "Apply to multiple internships with one profile - no repeated form filling"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-block">
                <span className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  For College Students Only
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Skills,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Your Future
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with your college placement cell, showcase your skills, 
                and discover internship opportunities designed for students like you.
              </p>
              <div className="flex gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    Join as Student
                  </Button>
                </Link>
                <Link to="/feed">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Explore Platform
                  </Button>
                </Link>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">Colleges</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-sm text-muted-foreground">Internships</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-float" />
              <img 
                src={heroImage} 
                alt="College students collaborating" 
                className="rounded-2xl shadow-glow relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need for Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Career Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From connecting with placement cells to landing your dream internship - all in one platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-glow transition-smooth">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How LinkX Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to launch your career</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-soft text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Sign up with your college email and showcase your skills, projects, and achievements
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect & Explore</h3>
                <p className="text-muted-foreground">
                  Link with your placement cell and browse internships tailored to your field
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Apply & Succeed</h3>
                <p className="text-muted-foreground">
                  Apply with one click, get placement cell support, and land your dream internship
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using LinkX to discover internships and build their careers
          </p>
          <Link to="/auth">
            <Button variant="secondary" size="lg" className="text-lg px-8">
              Sign Up with College Email
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
                <span className="text-xl font-bold">LinkX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The student internship platform connecting you with opportunities
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Find Internships</div>
                <div>Build Profile</div>
                <div>Connect with Peers</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Career Guide</div>
                <div>Resume Tips</div>
                <div>Interview Prep</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>FAQs</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 LinkX. Empowering college students to build their future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
