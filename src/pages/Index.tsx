
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Github, Braces, Zap, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-accent mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
              DocGen.AI
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <Button variant="outline" size="sm" onClick={handleGetStarted}>
              Dashboard
            </Button>
          </nav>
          
          <Button className="md:hidden" variant="ghost" size="sm" onClick={handleGetStarted}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 flex-1 flex items-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium mb-4">
              Version 1.0 - Now Available
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              AI-Powered Documentation for
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
                Your Code
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate comprehensive documentation for your code repositories with a single click. Save time and ensure your projects are always well-documented.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-20 bottom-0 z-10"></div>
            <div className="glass-panel border border-border rounded-lg overflow-hidden shadow-xl animate-float">
              <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-destructive/70 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500/70 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500/70 rounded-full"></div>
                </div>
                <div className="text-xs font-mono text-center flex-1">
                  documentation.md
                </div>
              </div>
              <div className="p-4 max-h-[300px] overflow-hidden">
                <pre className="font-mono text-xs text-left">
                  <code>
{`# API Client Library

## Overview

This library provides a lightweight client for interacting with the REST API. 
It handles authentication, request formatting, and response parsing.

## Installation

\`\`\`bash
npm install @company/api-client
\`\`\`

## Basic Usage

\`\`\`typescript
import { ApiClient } from '@company/api-client';

// Initialize the client
const client = new ApiClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.example.com'
});

// Make a request
async function fetchUsers() {
  const response = await client.get('/users');
  return response.data;
}
\`\`\`

## Authentication

The client supports multiple authentication methods:

1. API Key (recommended)
2. OAuth tokens
3. Basic authentication

## Error Handling

All methods return a promise that rejects with an ApiError if the request fails.
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold">
              Generate Documentation in Seconds
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your code to create clear, comprehensive documentation automatically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Github className="h-8 w-8 text-accent" />}
              title="GitHub Integration"
              description="Connect your GitHub repositories with a few clicks. Public and private repos supported."
            />
            
            <FeatureCard 
              icon={<Braces className="h-8 w-8 text-accent" />}
              title="Multi-Language Support"
              description="Support for JavaScript, TypeScript, Python, Java, and more programming languages."
            />
            
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-accent" />}
              title="Instant Generation"
              description="Generate documentation instantly, with smart analysis of your code structure."
            />
            
            <FeatureCard 
              icon={<BookOpen className="h-8 w-8 text-accent" />}
              title="Markdown Format"
              description="Well-formatted documentation in Markdown for easy viewing and integration."
            />
            
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-accent" />}
              title="Custom Templates"
              description="Choose from various documentation templates or create your own custom format."
            />
            
            <FeatureCard 
              icon={<ArrowRight className="h-8 w-8 text-accent" />}
              title="Continuous Updates"
              description="Keep your documentation in sync with your code changes automatically."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Generate comprehensive documentation in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard 
              number="01"
              title="Connect Repository"
              description="Link your GitHub repository to DocGen.AI in seconds."
            />
            
            <StepCard 
              number="02"
              title="Select Files"
              description="Choose which files or folders you want to document."
            />
            
            <StepCard 
              number="03"
              title="Generate & Download"
              description="AI generates documentation which you can preview and download."
            />
          </div>
          
          <div className="text-center mt-16">
            <Button onClick={handleGetStarted} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <FileText className="h-5 w-5 text-accent mr-2" />
              <span className="text-lg font-semibold">DocGen.AI</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DocGen.AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-panel p-6 rounded-lg border border-border transition-all duration-300 hover:translate-y-[-5px] hover-glow animate-scale-in">
      <div className="bg-accent/10 p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="relative animate-scale-in">
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div className="glass-panel p-6 pt-8 rounded-lg border border-border h-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Index;
