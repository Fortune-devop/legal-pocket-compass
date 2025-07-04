
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { 
  BookOpen, 
  FileText, 
  RefreshCw, 
  Save, 
  Send, 
  Share,
  User,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { JurisdictionSelector } from "@/components/jurisdiction-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define message types
interface ChatMessage {
  id: number;
  role: string;
  content: string;
  references?: string[];
}

// Example chat messages
const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "system",
    content: "Welcome to LegalPocket! Ask me any legal question, and I'll do my best to provide helpful information.",
  },
];

// Example saved conversations
const savedConversations = [
  { id: 1, title: "Tenant Rights Question", date: "Apr 12, 2025" },
  { id: 2, title: "Small Claims Court Process", date: "Apr 10, 2025" },
  { id: 3, title: "Employment Contract Review", date: "Apr 5, 2025" },
];

export function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [jurisdiction, setJurisdiction] = useState("federal");

  // Scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: getSimulatedResponse(input),
        references: ["Civil Code § 1954", "Smith v. Jones (2021)"],
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const getSimulatedResponse = (question: string) => {
    // This is just for demonstration purposes
    if (question.toLowerCase().includes("landlord") || question.toLowerCase().includes("tenant")) {
      return "In most states, landlords must provide at least 24 hours notice before entering a tenant's property, except in cases of emergency. This is covered under Civil Code § 1954, which protects tenants' right to privacy and peaceful enjoyment of their rental unit.";
    } else if (question.toLowerCase().includes("will") || question.toLowerCase().includes("estate")) {
      return "Estate planning typically involves creating documents like wills, trusts, and powers of attorney. Each state has different requirements for what makes these documents legally valid, but most require witnesses and notarization for key documents like wills.";
    } else {
      return "That's an interesting legal question. The answer would depend on specific circumstances and the jurisdiction you're in. In general, it's advisable to consult with a licensed attorney in your area who specializes in this particular field of law for personalized advice.";
    }
  };

  return (
    <div className="container px-4 py-8 md:py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <Tabs defaultValue="conversations">
              <TabsList className="w-full">
                <TabsTrigger value="conversations" className="flex-1">Conversations</TabsTrigger>
                <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversations" className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold">Saved Conversations</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      New
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="flex flex-col gap-2">
                      {savedConversations.map((convo) => (
                        <div 
                          key={convo.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{convo.title}</span>
                            <span className="text-xs text-muted-foreground">{convo.date}</span>
                          </div>
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="p-4">
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading font-semibold">Helpful Resources</h3>
                  
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="flex flex-col gap-2">
                      <div className="p-3 rounded-lg bg-secondary">
                        <h4 className="font-medium text-sm">Tenant Rights Guide</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Comprehensive overview of tenant rights and responsibilities.
                        </p>
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Read
                        </Button>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-secondary">
                        <h4 className="font-medium text-sm">Small Claims Court Tutorial</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Step-by-step guide to filing in small claims court.
                        </p>
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Read
                        </Button>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-secondary">
                        <h4 className="font-medium text-sm">Employment Law Basics</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Overview of rights in the workplace.
                        </p>
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-1">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Read
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Chat interface */}
        <div className="md:col-span-2 flex flex-col">
          <Card className="flex flex-col h-full">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-heading font-semibold">Legal Chat</h2>
              </div>
              <div className="flex items-center gap-2">
                <JurisdictionSelector 
                  onSelect={(value) => setJurisdiction(value)}
                  className="text-sm h-9"
                />
                <Button variant="ghost" size="icon" title="Save conversation">
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Share conversation">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Legal disclaimer */}
            <Alert variant="default" className="rounded-none border-x-0 border-t-0 bg-legal-yellow/20 border-legal-yellow">
              <AlertDescription className="text-xs">
                Information provided is for educational purposes only, not legal advice. Always consult a qualified attorney for specific legal matters.
              </AlertDescription>
            </Alert>
            
            {/* Messages container */}
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex gap-3 max-w-[80%]">
                      {message.role !== "user" && (
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </Avatar>
                      )}
                      
                      <div
                        className={`rounded-xl p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : message.role === "system"
                            ? "bg-muted text-muted-foreground"
                            : "bg-card border border-border"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {message.role === "assistant" && message.references && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.references.map((ref, index) => (
                              <span key={index} className="legal-citation text-xs">
                                {ref}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 bg-primary">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* AI thinking indicator */}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </Avatar>
                      <div className="bg-card border border-border rounded-xl p-4">
                        <div className="thinking-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={endOfMessagesRef} />
              </div>
            </ScrollArea>
            
            {/* Input area */}
            <div className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex flex-col gap-4"
              >
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a legal question..."
                  className="min-h-[80px] resize-none focus-visible:ring-primary"
                />
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground self-center">
                    Not a substitute for professional legal advice
                  </p>
                  <Button type="submit" disabled={!input.trim() || isThinking}>
                    <Send className="h-4 w-4 mr-2" />
                    {isThinking ? "Thinking..." : "Send"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
