import { useState, useEffect, useCallback, useRef } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("conversations")
      .select("*, p1:participant_one(id, first_name, last_name, avatar_url), p2:participant_two(id, first_name, last_name, avatar_url)")
      .or(`participant_one.eq.${user.id},participant_two.eq.${user.id}`)
      .order("last_message_at", { ascending: false });

    const mapped = (data || []).map((c) => {
      const other = c.participant_one === user.id ? c.p2 : c.p1;
      return { ...c, otherUser: other };
    });
    setConversations(mapped);
    if (mapped.length > 0 && !selectedConv) setSelectedConv(mapped[0]);
    setLoading(false);
  }, [user, selectedConv]);

  const fetchMessages = useCallback(async () => {
    if (!selectedConv) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", selectedConv.id)
      .order("created_at", { ascending: true });
    setMessages(data || []);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [selectedConv]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Realtime messages
  useEffect(() => {
    if (!selectedConv) return;
    const channel = supabase
      .channel(`messages-${selectedConv.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${selectedConv.id}` }, (payload) => {
        setMessages((prev) => [...prev, payload.new as any]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedConv]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || !selectedConv) return;
    const { error } = await supabase.from("messages").insert({
      conversation_id: selectedConv.id,
      sender_id: user.id,
      content: message.trim(),
    });
    if (error) toast.error("Failed to send message");
    else {
      setMessage("");
      // Update last_message_at
      await supabase.from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", selectedConv.id);
    }
  };

  const getName = (p: any) => p ? `${p.first_name || ""} ${p.last_name || ""}`.trim() || "User" : "User";
  const getInitials = (p: any) => p ? `${(p.first_name || "?")[0]}${(p.last_name || "")[0] || ""}` : "?";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-soft h-[calc(100vh-12rem)]">
            <CardContent className="p-0 h-full">
              <div className="grid grid-cols-12 h-full">
                {/* Conversations List */}
                <div className="col-span-12 md:col-span-4 border-r h-full flex flex-col">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-bold mb-4">Messages</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search messages..." className="pl-10" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {loading && <div className="p-4 text-muted-foreground text-sm">Loading...</div>}
                    {!loading && conversations.length === 0 && (
                      <div className="p-4 text-muted-foreground text-sm">No conversations yet.</div>
                    )}
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConv(conv)}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-smooth ${selectedConv?.id === conv.id ? "bg-muted" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conv.otherUser?.avatar_url || ""} />
                            <AvatarFallback>{getInitials(conv.otherUser)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{getName(conv.otherUser)}</h3>
                            <p className="text-xs text-muted-foreground">
                              {new Date(conv.last_message_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="col-span-12 md:col-span-8 h-full flex flex-col">
                  {selectedConv ? (
                    <>
                      <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={selectedConv.otherUser?.avatar_url || ""} />
                            <AvatarFallback>{getInitials(selectedConv.otherUser)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{getName(selectedConv.otherUser)}</h3>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender_id === user?.id ? "bg-gradient-primary text-primary-foreground" : "bg-muted"}`}>
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${msg.sender_id === user?.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                      <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
                          <Button type="submit" variant="hero" disabled={!message.trim()}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      Select a conversation or start a new one from Connections
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
