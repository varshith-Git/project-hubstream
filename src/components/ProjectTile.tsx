
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderGit2, FileText, Download, Github, Info } from 'lucide-react';
import { Project } from '@/utils/projectTypes';

interface ProjectTileProps {
  project: Project;
  onImportRepo: (projectId: string) => void;
  onGenerateDoc: (projectId: string) => void | Promise<void>;
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
  const navigate = useNavigate();
  
  // Format date to be more readable
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const repoCount = project.repositories.length;
  const hasDocs = !!project.documentation?.generated;
  
  return (
    <Card 
      className="glass-panel h-full flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover-glow cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 py-4">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Repositories</span>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                {repoCount}
              </span>
            </div>
            
            {repoCount === 0 ? (
              <div className="text-xs text-muted-foreground">
                No repositories added yet
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                {project.repositories.slice(0, 2).map(repo => (
                  <div key={repo.id} className="truncate mb-1">{repo.name}</div>
                ))}
                {repoCount > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{repoCount - 2} more repositories
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-auto">
            {hasDocs && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Documentation</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Generated
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full flex justify-center">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/project/${project.id}`);
            }}
          >
            <Info className="mr-2 h-3 w-3" />
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectTile;
