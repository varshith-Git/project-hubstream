
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Zap, 
  CheckCircle, 
  XCircle,
  ArrowUpRight
} from 'lucide-react';

const Billing: React.FC = () => {
  // Mock data
  const userPlan = {
    type: 'free',
    apiUsage: 45,
    apiLimit: 100,
    features: {
      basic: true,
      advancedAI: false,
      prioritySupport: false,
      customDomains: false,
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Basic features for personal projects.',
      features: ['100 API Calls/month', 'Basic Documentation', 'Public Repositories']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19,
      description: 'Enhanced features for professional use.',
      features: ['Unlimited API Calls', 'Advanced AI Documentation', 'Private Repositories', 'Priority Support']
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border p-4">
          <h1 className="text-2xl font-semibold">Billing & Usage</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Plan */}
              <Card className="glass-panel md:col-span-1 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-accent" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Plan</span>
                    <span className="font-semibold">
                      {userPlan.type === 'free' ? 'Free' : 'Pro'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Usage</span>
                    <span className="font-semibold">
                      {userPlan.apiUsage}/{userPlan.apiLimit}
                    </span>
                  </div>
                  
                  <Progress value={(userPlan.apiUsage / userPlan.apiLimit) * 100} className="h-1.5" />
                  
                  <p className="text-xs text-muted-foreground">
                    {userPlan.apiUsage} of {userPlan.apiLimit} API calls used this month
                  </p>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                        Basic Documentation
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {userPlan.features.advancedAI ? (
                        <span className="text-sm flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          Advanced AI Models
                        </span>
                      ) : (
                        <span className="text-sm flex items-center gap-1 text-muted-foreground">
                          <XCircle className="h-3.5 w-3.5" />
                          Advanced AI Models
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {userPlan.features.prioritySupport ? (
                        <span className="text-sm flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                          Priority Support
                        </span>
                      ) : (
                        <span className="text-sm flex items-center gap-1 text-muted-foreground">
                          <XCircle className="h-3.5 w-3.5" />
                          Priority Support
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Plan Options */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={cn(
                      "glass-panel relative overflow-hidden transition-all hover:scale-[1.02] hover-glow",
                      plan.id === 'pro' && "border-accent"
                    )}
                  >
                    {plan.id === 'pro' && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-accent text-accent-foreground text-xs py-1 px-3 rounded-bl-lg">
                          RECOMMENDED
                        </div>
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {plan.name}
                      </CardTitle>
                      <CardDescription>
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      {plan.id === userPlan.type ? (
                        <Button disabled className="w-full">
                          Current Plan
                        </Button>
                      ) : (
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* API Usage Details */}
            <Card className="glass-panel mt-6 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  API Usage History
                </CardTitle>
                <CardDescription>
                  View your API usage history and trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border p-4 flex flex-col items-center justify-center">
                  <p className="text-muted-foreground text-sm mb-2">API usage visualization will appear here</p>
                  <Progress value={45} className="w-full h-1.5 mb-2" />
                  <div className="text-xs text-muted-foreground">
                    45 of 100 API calls used this month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Billing;
