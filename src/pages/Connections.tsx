import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, UserCheck, UserMinus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Connections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchConnections = useCallback(async () => {
    if (!user) return;

    // Accepted connections
    const { data: accepted } = await supabase
      .from("connections")
      .select("*, requester:requester_id(id, first_name, last_name, avatar_url, major, college), recipient:recipient_id(id, first_name, last_name, avatar_url, major, college)")
      .or(`requester_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .eq("status", "accepted");

    const mapped = (accepted || []).map((c: any) => {
      const other = c.requester_id === user.id ? c.recipient : c.requester;
      return { ...(other as any), connectionId: c.id };
    });
    setConnections(mapped);

    // Pending requests (received)
    const { data: pendingData } = await supabase
      .from("connections")
      .select("*, requester:requester_id(id, first_name, last_name, avatar_url, major, college)")
      .eq("recipient_id", user.id)
      .eq("status", "pending");

    setPending(
      (pendingData || []).map((c: any) => ({ ...(c.requester as any), connectionId: c.id }))
    );

    // Suggestions: profiles not connected
    const connectedIds = [
      ...(accepted || []).map((c) => c.requester_id === user.id ? c.recipient_id : c.requester_id),
      ...(pendingData || []).map((c) => c.requester_id),
      user.id,
    ];

    const { data: sugData } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, avatar_url, major, college")
      .not("id", "in", `(${connectedIds.join(",")})`)
      .limit(6);

    setSuggestions(sugData || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const sendRequest = async (recipientId: string) => {
    if (!user) return;
    const { error } = await supabase.from("connections").insert({
      requester_id: user.id,
      recipient_id: recipientId,
    });
    if (error) toast.error("Failed to send request");
    else {
      toast.success("Connection request sent!");
      fetchConnections();
    }
  };

  const acceptRequest = async (connectionId: string) => {
    const { error } = await supabase
      .from("connections")
      .update({ status: "accepted" })
      .eq("id", connectionId);
    if (error) toast.error("Failed to accept");
    else {
      toast.success("Connection accepted!");
      fetchConnections();
    }
  };

  const declineRequest = async (connectionId: string) => {
    const { error } = await supabase
      .from("connections")
      .update({ status: "rejected" })
      .eq("id", connectionId);
    if (error) toast.error("Failed to decline");
    else {
      toast.success("Request declined");
      fetchConnections();
    }
  };

  const removeConnection = async (connectionId: string) => {
    const { error } = await supabase.from("connections").delete().eq("id", connectionId);
    if (error) toast.error("Failed to remove");
    else {
      toast.success("Connection removed");
      fetchConnections();
    }
  };

  const getInitials = (p: any) => `${(p.first_name || "?")[0]}${(p.last_name || "")[0] || ""}`;
  const getName = (p: any) => `${p.first_name || ""} ${p.last_name || ""}`.trim() || "User";

  const filteredConnections = connections.filter((c) =>
    getName(c).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">My Network</h1>
            <p className="text-muted-foreground">Manage your professional connections</p>
          </div>

          <Card className="shadow-soft mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search connections..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="connections" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connections">Connections ({connections.length})</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">No connections yet.</p>
                )}
                {filteredConnections.map((c) => (
                  <Card key={c.id} className="shadow-soft hover:shadow-glow transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={c.avatar_url || ""} />
                          <AvatarFallback className="text-xl">{getInitials(c)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{getName(c)}</h3>
                          <p className="text-sm text-muted-foreground">{c.major} • {c.college}</p>
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" className="flex-1" size="sm">Message</Button>
                          <Button variant="ghost" size="icon" onClick={() => removeConnection(c.connectionId)}>
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">No suggestions available.</p>
                )}
                {suggestions.map((s) => (
                  <Card key={s.id} className="shadow-soft hover:shadow-glow transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={s.avatar_url || ""} />
                          <AvatarFallback className="text-xl">{getInitials(s)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{getName(s)}</h3>
                          <p className="text-sm text-muted-foreground">{s.major} • {s.college}</p>
                        </div>
                        <Button variant="hero" className="w-full" size="sm" onClick={() => sendRequest(s.id)}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pending.length === 0 && (
                  <p className="text-muted-foreground col-span-3 text-center py-8">No pending requests.</p>
                )}
                {pending.map((p) => (
                  <Card key={p.id} className="shadow-soft hover:shadow-glow transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={p.avatar_url || ""} />
                          <AvatarFallback className="text-xl">{getInitials(p)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{getName(p)}</h3>
                          <p className="text-sm text-muted-foreground">{p.major} • {p.college}</p>
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button variant="hero" className="flex-1" size="sm" onClick={() => acceptRequest(p.connectionId)}>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="outline" className="flex-1" size="sm" onClick={() => declineRequest(p.connectionId)}>
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Connections;
