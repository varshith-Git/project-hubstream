
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderGit2, FileText, Download, Github } from 'lucide-react';
import { Project } from '@/utils/projectUtils';

interface ProjectTileProps {
  project: Project;
  onImportRepo: (projectId: string) => void;
  onGenerateDoc: (projectId: string, filePath?: string) => Promise<void>;
  onDownloadDoc: (projectId: string) => void;
  onViewStructure: (projectId: string) => void;
}

const ProjectTile: React.FC<ProjectTileProps> = ({
  project,
  onImportRepo,
  onGenerateDoc,
  onDownloadDoc,
  onViewStructure
}) => {
  // Format date to be more readable
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const hasRepo = !!project.repository;
  const hasDocs = !!project.documentation?.generated;
  
  return (
    <Card className="glass-panel h-full flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover-glow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="flex flex-col h-full">
          {!hasRepo && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-3">
              <Github className="w-12 h-12 text-muted-foreground opacity-70" />
              <p className="text-sm text-muted-foreground">No repository connected</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => onImportRepo(project.id)}
              >
                <FolderGit2 className="mr-2 h-4 w-4" />
                Import Repository
              </Button>
            </div>
          )}
          
          {hasRepo && !hasDocs && (
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Repository</span>
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                  {project.repository?.type}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground truncate">
                {project.repository?.url}
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center gap-3 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => onViewStructure(project.id)}
                >
                  <FolderGit2 className="mr-2 h-4 w-4" />
                  View Structure
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm"
                  className="w-full" 
                  onClick={() => onGenerateDoc(project.id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Documentation
                </Button>
              </div>
            </div>
          )}
          
          {hasRepo && hasDocs && (
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Documentation</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Generated
                </span>
              </div>
              
              <div className="flex-1 flex flex-col justify-between gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => onViewStructure(project.id)}
                >
                  <FolderGit2 className="mr-2 h-4 w-4" />
                  View Structure
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm"
                  className="w-full" 
                  onClick={() => onDownloadDoc(project.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download MD
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTile;
