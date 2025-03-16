
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  KeyRound, 
  Bell, 
  Shield, 
  LogOut,
  Github
} from 'lucide-react';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences updated");
  };
  
  const handleConnectGithub = () => {
    toast.success("GitHub account connected successfully");
  };
  
  const handleLogout = () => {
    toast.info("You have been logged out");
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border p-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="profile" className="glass-panel rounded-lg border border-border animate-fade-in">
              <TabsList className="grid grid-cols-4 p-1 bg-muted rounded-t-lg">
                <TabsTrigger value="profile" className="flex items-center gap-1 text-xs sm:text-sm">
                  <User className="h-3.5 w-3.5 md:mr-1" />
                  <span className="hidden md:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-1 text-xs sm:text-sm">
                  <KeyRound className="h-3.5 w-3.5 md:mr-1" />
                  <span className="hidden md:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-1 text-xs sm:text-sm">
                  <Bell className="h-3.5 w-3.5 md:mr-1" />
                  <span className="hidden md:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-1 text-xs sm:text-sm">
                  <Shield className="h-3.5 w-3.5 md:mr-1" />
                  <span className="hidden md:inline">Security</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="profile" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Profile Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage your personal information and how it appears to others.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                        placeholder="Tell us about yourself"
                        defaultValue="Software developer with a passion for documentation and AI."
                      />
                    </div>
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="account" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Account Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage your account and connected services.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Connected Accounts</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your accounts to enable repository imports.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-border p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Github className="h-6 w-6" />
                        <div>
                          <h4 className="text-sm font-medium">GitHub</h4>
                          <p className="text-xs text-muted-foreground">
                            Connect to import repositories
                          </p>
                        </div>
                      </div>
                      <Button onClick={handleConnectGithub} variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mt-6">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all of your data.
                      </p>
                    </div>
                    
                    <Card className="border-destructive/50 bg-destructive/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-destructive">Delete Account</CardTitle>
                        <CardDescription className="text-xs">
                          Once you delete your account, there is no going back.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Notification Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Control which notifications you receive.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <form onSubmit={handleSaveNotifications} className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-medium">Documentation Generated</h3>
                          <p className="text-xs text-muted-foreground">
                            Receive notifications when documentation is generated
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-medium">API Usage Alerts</h3>
                          <p className="text-xs text-muted-foreground">
                            Get notified when you're approaching API limits
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-medium">Email Notifications</h3>
                          <p className="text-xs text-muted-foreground">
                            Receive updates and newsletters via email
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Button type="submit">Save Preferences</Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Security Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage your account security and sessions.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      
                      <Button>Update Password</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Active Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage devices where you're currently logged in.
                      </p>
                      
                      <div className="rounded-lg border border-border p-4 mb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Current Browser</p>
                            <p className="text-xs text-muted-foreground">
                              Chrome on macOS • Active now
                            </p>
                          </div>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                            Current
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout from All Devices
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
