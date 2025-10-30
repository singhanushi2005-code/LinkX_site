import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-network.jpg";
import Header from "@/components/Header";

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: "Connect Globally",
      description: "Build meaningful professional relationships across industries and borders"
    },
    {
      icon: Briefcase,
      title: "Find Opportunities",
      description: "Discover jobs, projects, and career advancement opportunities"
    },
    {
      icon: MessageSquare,
      title: "Engage & Share",
      description: "Share insights, join discussions, and learn from industry leaders"
    },
    {
      icon: TrendingUp,
      title: "Grow Your Career",
      description: "Access resources and tools to accelerate your professional growth"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and privacy are protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Stay connected with instant notifications and live interactions"
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
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to the Professional{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Network
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with professionals, discover opportunities, and grow your career with LinkX - 
                the modern platform for meaningful professional connections.
              </p>
              <div className="flex gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    Get Started
                  </Button>
                </Link>
                <Link to="/feed">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Explore
                  </Button>
                </Link>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    10M+
                  </div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    500K+
                  </div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    1M+
                  </div>
                  <div className="text-sm text-muted-foreground">Jobs Posted</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-float" />
              <img 
                src={heroImage} 
                alt="Professional networking" 
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
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">LinkX</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build and grow your professional network in one powerful platform
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

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join millions of professionals already building their future on LinkX
          </p>
          <Link to="/auth">
            <Button variant="secondary" size="lg" className="text-lg px-8">
              Join LinkX Today
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
                The modern professional networking platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Privacy</div>
                <div>Terms</div>
                <div>Cookies</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 LinkX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
