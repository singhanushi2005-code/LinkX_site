import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Auth logic will be implemented with Lovable Cloud
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Auth logic will be implemented with Lovable Cloud
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LinkX
          </span>
        </Link>

        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Exclusive platform for college students
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle>Welcome back, Student</CardTitle>
                <CardDescription>
                  Sign in with your college email to continue
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">College Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="student@college.edu" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required
                    />
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle>Create Student Account</CardTitle>
                <CardDescription>
                  Join LinkX to discover internship opportunities
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input 
                        id="firstname" 
                        placeholder="John" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input 
                        id="lastname" 
                        placeholder="Doe" 
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">College Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="student@college.edu" 
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Must be a valid .edu email address
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college">College Name</Label>
                    <Input 
                      id="college" 
                      placeholder="Enter your college name" 
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major/Field</Label>
                      <Input 
                        id="major" 
                        placeholder="Computer Science" 
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our Terms of Service and confirm you are a current college student.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Student Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
