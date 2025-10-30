import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, UserCheck, UserMinus } from "lucide-react";

const Connections = () => {
  // Mock data - will be replaced with real data from Lovable Cloud
  const connections = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Connection ${i + 1}`,
    title: "Professional Title",
    mutualConnections: Math.floor(Math.random() * 50) + 10,
    isConnected: true
  }));

  const suggestions = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Suggested User ${i + 1}`,
    title: "Professional Title",
    mutualConnections: Math.floor(Math.random() * 30) + 5,
    isConnected: false
  }));

  const pending = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: `Pending User ${i + 1}`,
    title: "Professional Title",
    isPending: true
  }));

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
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="connections" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connections">
                Connections ({connections.length})
              </TabsTrigger>
              <TabsTrigger value="suggestions">
                Suggestions ({suggestions.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pending.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((connection) => (
                  <Card key={connection.id} className="shadow-soft hover:shadow-glow transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="text-xl">
                            {connection.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{connection.name}</h3>
                          <p className="text-sm text-muted-foreground">{connection.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {connection.mutualConnections} mutual connections
                          </p>
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" className="flex-1" size="sm">
                            Message
                          </Button>
                          <Button variant="ghost" size="icon">
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
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="shadow-soft hover:shadow-glow transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="text-xl">
                            {suggestion.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{suggestion.name}</h3>
                          <p className="text-sm text-muted-foreground">{suggestion.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.mutualConnections} mutual connections
                          </p>
                        </div>
                        <Button variant="hero" className="w-full" size="sm">
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
                {pending.map((request) => (
                  <Card key={request.id} className="shadow-soft hover:shadow-glow transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="text-xl">
                            {request.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">{request.title}</p>
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button variant="hero" className="flex-1" size="sm">
                            <UserCheck className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="outline" className="flex-1" size="sm">
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
