
import React, { useState, useEffect } from 'react';
import { Code, FileCode, Terminal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FileReadingAnimationProps {
  files: string[];
  onComplete: () => void;
  isOpen: boolean;
}

const FileReadingAnimation: React.FC<FileReadingAnimationProps> = ({ 
  files, 
  onComplete,
  isOpen 
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [processingText, setProcessingText] = useState("Initializing...");
  
  useEffect(() => {
    if (!isOpen) return;
    
    // Reset state when animation starts
    setCurrentFileIndex(0);
    setProgress(0);
    setProcessingText("Initializing...");
    
    const fileCount = files.length;
    const progressPerFile = 100 / fileCount;
    
    // Messages for processing phases
    const processingMessages = [
      "Reading file contents...",
      "Analyzing code structure...",
      "Extracting documentation...",
      "Generating markdown...",
      "Finalizing documentation..."
    ];
    
    // Process one file at a time
    const processFile = (index: number) => {
      if (index >= fileCount) {
        setProgress(100);
        setProcessingText("Documentation complete!");
        setTimeout(() => onComplete(), 1000);
        return;
      }
      
      setCurrentFileIndex(index);
      
      // Randomly select a processing message
      const messageIndex = Math.floor(Math.random() * processingMessages.length);
      setProcessingText(processingMessages[messageIndex]);
      
      // Update progress
      setProgress((index + 0.5) * progressPerFile);
      
      // Process next file after delay
      setTimeout(() => {
        setProgress((index + 1) * progressPerFile);
        setTimeout(() => processFile(index + 1), Math.random() * 300 + 300);
      }, Math.random() * 500 + 500);
    };
    
    // Start processing after a short delay
    const timer = setTimeout(() => processFile(0), 500);
    
    return () => clearTimeout(timer);
  }, [isOpen, files.length, onComplete]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border w-full max-w-md rounded-lg p-6 shadow-lg animate-scale-in">
        <div className="flex items-center mb-4">
          <Terminal className="mr-2 h-5 w-5 text-accent" />
          <h3 className="text-lg font-medium">Generating Documentation</h3>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-md p-4 font-mono text-xs overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="animate-pulse flex items-center">
                <Code className="mr-2 h-4 w-4" />
                <span>{processingText}</span>
              </div>
            </div>
            
            <div className="opacity-20">
              {currentFileIndex < files.length && (
                <div className="flex items-center text-accent mb-2">
                  <FileCode className="mr-2 h-4 w-4" />
                  <span className="font-semibold">{files[currentFileIndex]}</span>
                </div>
              )}
              
              <div className="space-y-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-3 bg-foreground/10 rounded w-full" style={{ width: `${Math.random() * 100}%` }}></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Processed {Math.min(currentFileIndex + 1, files.length)} of {files.length} files
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileReadingAnimation;
