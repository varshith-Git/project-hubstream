
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Code } from 'lucide-react';

interface MdPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onDownload: () => void;
}

const MdPreview: React.FC<MdPreviewProps> = ({
  isOpen,
  onClose,
  content,
  onDownload,
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  
  // Simple markdown to HTML conversion (this is very basic, in a real app you'd use a library)
  const parseMarkdown = (md: string) => {
    // Replace code blocks
    let html = md.replace(/```(.+?)\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>$2</code></pre>');
    
    // Replace headers
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
    
    // Replace lists
    html = html.replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/<\/li>\n<li/g, '</li><li');
    html = html.replace(/<li(.*?)>(.*?)<\/li>/g, '<ul class="list-disc mb-4"><li$1>$2</li></ul>');
    html = html.replace(/<\/ul>\n<ul(.*?)>/g, '');
    
    // Replace links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a class="text-accent underline" href="$2">$1</a>');
    
    // Replace bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace tables
    html = html.replace(/\|([^|]*)\|/g, '<td class="border border-border p-2">$1</td>');
    html = html.replace(/<\/td><td/g, '</td><td');
    html = html.replace(/<td(.*?)>(.*?)<\/td>/g, '<tr><td$1>$2</td></tr>');
    html = html.replace(/<\/tr>\n<tr>/g, '</tr><tr>');
    html = html.replace(/<tr(.*?)>(.*?)<\/tr>/g, '<table class="border-collapse w-full mb-4"><tr$1>$2</tr></table>');
    html = html.replace(/<\/table>\n<table(.*?)>/g, '');
    
    // Replace paragraphs
    html = html.replace(/^([^<].*)\n$/gm, '<p class="mb-4">$1</p>');
    
    return html;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-4xl border border-border animate-scale-in h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation Preview
          </DialogTitle>
          
          <div className="flex justify-between items-center mt-2">
            <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="preview" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="raw" className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  Raw
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              onClick={onDownload}
              size="sm"
              className="ml-4"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogHeader>
        
        <ScrollArea className="mt-2 h-[calc(80vh-120px)]">
          <TabsContent value="preview" className="p-4 pt-0">
            <div className="markdown-preview">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="raw" className="p-4 pt-0">
            <pre className="text-sm font-mono bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
              {content}
            </pre>
          </TabsContent>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MdPreview;
