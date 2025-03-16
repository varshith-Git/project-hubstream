
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FileText,
  FileCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileNode } from '@/utils/projectTypes';

interface FolderStructureProps {
  isOpen: boolean;
  onClose: () => void;
  fileStructure: FileNode[];
  onFileSelect: (filePath: string) => void;
  selectedFile?: string;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  selectedFile?: string;
  onFileSelect: (filePath: string) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  node, 
  level, 
  selectedFile, 
  onFileSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = node.type === 'folder';
  const isSelected = node.path === selectedFile;
  
  const toggleOpen = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(node.path);
    }
  };
  
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.md')) return <FileText className="h-4 w-4 text-accent" />;
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx') || fileName.endsWith('.js')) {
      return <FileCode className="h-4 w-4 text-blue-400" />;
    }
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };
  
  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer text-sm transition-colors",
          isSelected ? "bg-accent/20 text-accent" : "hover:bg-background/80",
          level === 0 ? "mt-1" : ""
        )}
        style={{ paddingLeft: `${(level * 12) + 4}px` }}
        onClick={toggleOpen}
      >
        {isFolder && (
          isOpen 
            ? <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" /> 
            : <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
        )}
        
        {isFolder 
          ? (isOpen 
              ? <FolderOpen className="h-4 w-4 mr-2 text-yellow-400" /> 
              : <Folder className="h-4 w-4 mr-2 text-yellow-400" />)
          : getFileIcon(node.name)
        }
        
        <span className={cn(
          "truncate",
          isFolder ? "font-medium" : "",
          isSelected ? "text-accent" : ""
        )}>
          {node.name}
        </span>
      </div>
      
      {isFolder && isOpen && node.children && (
        <div className="animate-fade-in">
          {node.children.map((child, index) => (
            <FileTreeItem
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderStructure: React.FC<FolderStructureProps> = ({
  isOpen,
  onClose,
  fileStructure,
  onFileSelect,
  selectedFile
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel sm:max-w-[700px] border border-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Repository Structure</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Browse files and select one to generate documentation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="col-span-1 border border-border rounded-lg p-2 bg-background/50">
            <div className="text-xs uppercase font-semibold text-muted-foreground mb-2 px-2">
              Files
            </div>
            <Separator className="my-1" />
            <ScrollArea className="h-[350px]">
              <div className="pr-4">
                {fileStructure.map((node, index) => (
                  <FileTreeItem
                    key={`${node.path}-${index}`}
                    node={node}
                    level={0}
                    selectedFile={selectedFile}
                    onFileSelect={onFileSelect}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <div className="col-span-1 md:col-span-2 border border-border rounded-lg p-3 bg-background/50">
            <div className="text-xs uppercase font-semibold text-muted-foreground mb-2">
              {selectedFile ? 'Selected File' : 'Instructions'}
            </div>
            <Separator className="my-1" />
            <ScrollArea className="h-[350px]">
              <div className="p-2 text-sm">
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-accent" />
                      <span className="font-medium">{selectedFile}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      This file has been selected. Click the button below to generate documentation.
                    </p>
                    <Button 
                      onClick={() => onFileSelect(selectedFile)}
                      className="w-full mt-4"
                    >
                      Generate Documentation for this File
                    </Button>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    <p>Select a file from the repository structure to generate documentation.</p>
                    <p className="mt-4">Documentation will be generated using AI analysis of the file content.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderStructure;
