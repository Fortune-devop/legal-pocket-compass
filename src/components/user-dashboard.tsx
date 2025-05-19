import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Bookmark,
  FileText,
  History,
  Settings,
  User,
} from "lucide-react";

// Example conversations
const conversations = [
  {
    id: 1,
    title: "Tenant Rights Question",
    date: "Apr 12, 2025",
    category: "Housing",
    preview: "Can a landlord enter my apartment without permission?",
  },
  {
    id: 2,
    title: "Small Claims Court Process",
    date: "Apr 10, 2025",
    category: "Courts",
    preview: "How do I file a small claims case in California?",
  },
  {
    id: 3,
    title: "Employment Contract Review",
    date: "Apr 5, 2025",
    category: "Employment",
    preview: "Is this non-compete clause enforceable in my state?",
  },
  {
    id: 4,
    title: "Divorce Process",
    date: "Mar 28, 2025",
    category: "Family",
    preview: "What documents do I need to file for divorce?",
  },
  {
    id: 5,
    title: "Copyright Question",
    date: "Mar 15, 2025",
    category: "IP",
    preview: "How do I copyright my creative work?",
  },
];

// Example bookmarks
const bookmarks = [
  {
    id: 1,
    title: "Fair Housing Act Summary",
    type: "Document",
    date: "Apr 9, 2025",
  },
  {
    id: 2,
    title: "Small Claims Court Guide",
    type: "Guide",
    date: "Apr 7, 2025",
  },
  {
    id: 3,
    title: "Employment Rights Reference",
    type: "Reference",
    date: "Apr 2, 2025",
  },
];

export function UserDashboard() {
  const [privacySettings, setPrivacySettings] = useState({
    saveHistory: true,
    dataCollection: false,
    thirdParty: false,
  });

  return (
    <div className="container px-4 py-8 md:py-12 max-w-6xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-bold">
            Your Legal Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your conversations, saved resources, and account settings.
          </p>
        </div>

        <Tabs defaultValue="conversations" className="space-y-4">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="conversations" className="flex gap-2 flex-1">
              <History className="h-4 w-4" />
              <span>Conversations</span>
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex gap-2 flex-1">
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex gap-2 flex-1">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>

          {/* Conversations Tab */}
          <TabsContent value="conversations">
            <div className="grid gap-6">
              {conversations.map((convo) => (
                <Card
                  key={convo.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <h3 className="font-heading font-semibold">
                            {convo.title}
                          </h3>
                        </div>
                        <Badge variant="outline">{convo.category}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {convo.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {convo.date}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Bookmark className="h-4 w-4" />
                            <span className="sr-only">Bookmark</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks">
            <div className="grid gap-6">
              {bookmarks.map((bookmark) => (
                <Card
                  key={bookmark.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <h3 className="font-heading font-semibold">
                            {bookmark.title}
                          </h3>
                        </div>
                        <Badge variant="secondary">{bookmark.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Saved on {bookmark.date}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Bookmark className="h-4 w-4 fill-primary" />
                            <span className="sr-only">Remove bookmark</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <div className="bg-primary text-primary-foreground flex items-center justify-center w-full h-full text-xl font-semibold">
                        JD
                      </div>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-heading font-semibold text-lg">
                        Jane Doe
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        jane.doe@example.com
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="save-history">
                          Save conversation history
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Store your chat conversations for future reference
                        </p>
                      </div>
                      <Switch
                        id="save-history"
                        checked={privacySettings.saveHistory}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({
                            ...prev,
                            saveHistory: checked,
                          }))
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-collection">
                          Service improvement data
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymous data collection to improve our
                          services
                        </p>
                      </div>
                      <Switch
                        id="data-collection"
                        checked={privacySettings.dataCollection}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({
                            ...prev,
                            dataCollection: checked,
                          }))
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="third-party">Third-party sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Share data with trusted partners
                        </p>
                      </div>
                      <Switch
                        id="third-party"
                        checked={privacySettings.thirdParty}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({
                            ...prev,
                            thirdParty: checked,
                          }))
                        }
                      />
                    </div>

                    <Button className="mt-2">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
