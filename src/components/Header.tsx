import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, Briefcase, Users, MessageSquare, Bell, User, GraduationCap, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-md shadow-soft">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">LinkX</span>
          </Link>

          {isAuthenticated && (
            <form onSubmit={handleSearch} className="hidden md:flex">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </form>
          )}
        </div>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/feed"><Button variant="ghost" size="icon" className="rounded-full"><Home className="h-5 w-5" /></Button></Link>
              <Link to="/connections"><Button variant="ghost" size="icon" className="rounded-full"><Users className="h-5 w-5" /></Button></Link>
              <Link to="/internships"><Button variant="ghost" size="icon" className="rounded-full"><Briefcase className="h-5 w-5" /></Button></Link>
              <Link to="/placement-cell"><Button variant="ghost" size="icon" className="rounded-full"><GraduationCap className="h-5 w-5" /></Button></Link>
              <Link to="/messages"><Button variant="ghost" size="icon" className="rounded-full"><MessageSquare className="h-5 w-5" /></Button></Link>
              <Button variant="ghost" size="icon" className="rounded-full"><Bell className="h-5 w-5" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full"><User className="h-5 w-5" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}><User className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth"><Button variant="ghost">Sign In</Button></Link>
              <Link to="/auth"><Button variant="hero">Join Now</Button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
