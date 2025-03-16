
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  FolderGit2, 
  ChevronLeft, 
  PlusCircle, 
  FileText,
  Download
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ImportRepoModal from '@/components/ImportRepoModal';
import FolderStructure from '@/components/FolderStructure';
import MdPreview from '@/components/MdPreview';
import FileReadingAnimation from '@/components/FileReadingAnimation';
import { 
  getProjectById, 
  importRepository, 
  generateDocumentation,
  downloadDocumentation,
  getRepositoryById
} from '@/utils/projectUtils';
import { Project, Repository } from '@/utils/projectTypes';
import { toast } from 'sonner';

const ProjectRepositories: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<Project | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [isMdPreviewOpen, setIsMdPreviewOpen] = useState(false);
  const [isAnimationOpen, setIsAnimationOpen] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  
  useEffect(() => {
    if (projectId) {
      const projectData = getProjectById(projectId);
      if (projectData) {
        setProject(projectData);
      } else {
        toast.error("Project not found");
        navigate('/dashboard');
      }
    }
  }, [projectId, navigate]);
  
  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-lg">Loading project...</div>
      </div>
    );
  }
  
  const handleImportRepo = () => {
    setIsImportModalOpen(true);
  };
  
  const handleImportSubmit = (
    url: string, 
    type: 'public' | 'private' | 'local',
    source: 'github' | 'bitbucket' | 'local'
  ) => {
    if (!projectId) return;
    
    try {
      const updatedProject = importRepository(projectId, url, type, source);
      setProject(updatedProject);
      toast.success("Repository imported successfully");
    } catch (error) {
      toast.error("Failed to import repository");
      console.error(error);
    }
  };
  
  const handleViewStructure = (repoId: string) => {
    setSelectedRepoId(repoId);
    setSelectedFilePath(null);
    setIsStructureModalOpen(true);
  };
  
  const handleFileSelect = (filePath: string) => {
    setSelectedFilePath(filePath);
    setIsStructureModalOpen(false);
    
    if (!projectId || !selectedRepoId) return;
    
    // Get mock file list for animation
    const repository = getRepositoryById(projectId, selectedRepoId);
    if (!repository?.structure) return;
    
    // Flatten file structure to get all file paths
    const getAllFiles = (nodes: any[]): string[] => {
      return nodes.reduce((acc, node) => {
        if (node.type === 'file') {
          return [...acc, node.path];
        }
        if (node.children && node.children.length) {
          return [...acc, ...getAllFiles(node.children)];
        }
        return acc;
      }, []);
    };
    
    const allFiles = getAllFiles(repository.structure);
    
    // Show file reading animation
    setIsAnimationOpen(true);
    
    // Animation will call handleGenerateDocComplete when done
  };
  
  const handleGenerateDoc = (repoId: string) => {
    setSelectedRepoId(repoId);
    
    // If we don't have a selected file, show the structure modal
    if (!selectedFilePath) {
      handleViewStructure(repoId);
      return;
    }
    
    // Get mock file list for animation
    const repository = getRepositoryById(projectId!, repoId);
    if (!repository?.structure) return;
    
    // Flatten file structure to get all file paths
    const getAllFiles = (nodes: any[]): string[] => {
      return nodes.reduce((acc, node) => {
        if (node.type === 'file') {
          return [...acc, node.path];
        }
        if (node.children && node.children.length) {
          return [...acc, ...getAllFiles(node.children)];
        }
        return acc;
      }, []);
    };
    
    const allFiles = getAllFiles(repository.structure);
    
    // Show file reading animation
    setIsAnimationOpen(true);
  };
  
  const handleGenerateDocComplete = async () => {
    if (!projectId || !selectedRepoId || !selectedFilePath) return;
    
    try {
      const updatedProject = await generateDocumentation(
        projectId, 
        selectedRepoId, 
        selectedFilePath
      );
      setProject(updatedProject);
      setIsAnimationOpen(false);
      setIsMdPreviewOpen(true);
    } catch (error) {
      toast.error("Failed to generate documentation");
      console.error(error);
      setIsAnimationOpen(false);
    }
  };
  
  const handleDownloadDoc = () => {
    if (!projectId) return;
    
    try {
      downloadDocumentation(projectId);
    } catch (error) {
      toast.error("Failed to download documentation");
      console.error(error);
    }
  };
  
  const selectedRepo = selectedRepoId 
    ? project.repositories.find(r => r.id === selectedRepoId) 
    : null;
  
  // Make a file list for animation from the repository structure
  const mockFiles = selectedRepo?.structure 
    ? selectedRepo.structure
        .flatMap(node => node.type === 'file' ? [node.path] : [])
        .concat(['main.py', 'index.js', 'app.py', 'README.md'])
    : ['main.py', 'index.js', 'app.py', 'README.md'];
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">{project.name}</h1>
          </div>
          
          <Button 
            onClick={handleImportRepo}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Import Repository
          </Button>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Repositories</h2>
            
            {project.repositories.length === 0 ? (
              <div className="glass-panel p-8 rounded-lg text-center">
                <FolderGit2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Repositories Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Import a repository from GitHub, Bitbucket, or your local filesystem to get started.
                </p>
                <Button 
                  onClick={handleImportRepo}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Import Repository
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {project.repositories.map((repo) => (
                  <div 
                    key={repo.id} 
                    className="glass-panel p-6 rounded-lg border border-border transition-all duration-300 hover:border-accent/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        {repo.source === 'github' && <Github className="h-5 w-5 mr-2" />}
                        {repo.source === 'bitbucket' && <Briefcase className="h-5 w-5 mr-2" />}
                        {repo.source === 'local' && <FileText className="h-5 w-5 mr-2" />}
                        <h3 className="font-medium truncate">{repo.name}</h3>
                      </div>
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                        {repo.type}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-4 truncate">
                      {repo.url}
                    </p>
                    
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => handleViewStructure(repo.id)}
                      >
                        <FolderGit2 className="mr-2 h-4 w-4" />
                        View Structure
                      </Button>
                      
                      <Button 
                        size="sm"
                        className="w-full"
                        onClick={() => handleGenerateDoc(repo.id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Documentation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {project.documentation?.generated && (
            <div className="mt-8">
              <Separator className="mb-6" />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Documentation</h2>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsMdPreviewOpen(true)}
                    variant="outline"
                    size="sm"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    onClick={handleDownloadDoc}
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="glass-panel p-4 rounded-lg">
                <div className="font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-64">
                  {project.documentation.content?.slice(0, 500)}...
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Modals */}
      <ImportRepoModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onImport={handleImportSubmit}
        projectId={projectId || ''}
      />
      
      {selectedRepo?.structure && (
        <FolderStructure 
          isOpen={isStructureModalOpen} 
          onClose={() => setIsStructureModalOpen(false)} 
          fileStructure={selectedRepo.structure}
          onFileSelect={handleFileSelect}
          selectedFile={selectedFilePath || undefined}
        />
      )}
      
      <FileReadingAnimation
        isOpen={isAnimationOpen}
        files={mockFiles}
        onComplete={handleGenerateDocComplete}
      />
      
      {project.documentation?.content && (
        <MdPreview 
          isOpen={isMdPreviewOpen} 
          onClose={() => setIsMdPreviewOpen(false)} 
          content={project.documentation.content}
          onDownload={handleDownloadDoc}
        />
      )}
    </div>
  );
};

export default ProjectRepositories;

// Import missing components
import { Github, Briefcase } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
