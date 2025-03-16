
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ProjectTile from '@/components/ProjectTile';
import CreateProjectModal from '@/components/CreateProjectModal';
import ImportRepoModal from '@/components/ImportRepoModal';
import FolderStructure from '@/components/FolderStructure';
import MdPreview from '@/components/MdPreview';
import { 
  Project, 
  getProjects, 
  createProject,
  importRepository, 
  generateDocumentation,
  downloadDocumentation
} from '@/utils/projectUtils';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [isMdPreviewOpen, setIsMdPreviewOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  
  const handleCreateProject = (name: string) => {
    try {
      const newProject = createProject(name);
      setProjects([...projects, newProject]);
      toast.success("Project created successfully");
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    }
  };
  
  const handleImportRepo = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsImportModalOpen(true);
  };
  
  const handleImportSubmit = (url: string, type: 'public' | 'private') => {
    if (!selectedProjectId) return;
    
    try {
      const updatedProject = importRepository(selectedProjectId, url, type);
      setProjects(projects.map(p => p.id === selectedProjectId ? updatedProject : p));
      toast.success("Repository imported successfully");
    } catch (error) {
      toast.error("Failed to import repository");
      console.error(error);
    }
  };
  
  const handleViewStructure = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedFilePath(null);
    setIsStructureModalOpen(true);
  };
  
  const handleFileSelect = async (filePath: string) => {
    setSelectedFilePath(filePath);
    setIsStructureModalOpen(false);
    
    if (!selectedProjectId) return;
    
    try {
      toast.loading("Generating documentation...");
      const updatedProject = await generateDocumentation(selectedProjectId, filePath);
      setProjects(projects.map(p => p.id === selectedProjectId ? updatedProject : p));
      toast.dismiss();
      toast.success("Documentation generated successfully");
      
      // Open MD preview
      setIsMdPreviewOpen(true);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate documentation");
      console.error(error);
    }
  };
  
  const handleGenerateDoc = async (projectId: string) => {
    setSelectedProjectId(projectId);
    
    // If we don't have a selected file, show the structure modal
    if (!selectedFilePath) {
      handleViewStructure(projectId);
      return;
    }
    
    try {
      toast.loading("Generating documentation...");
      const updatedProject = await generateDocumentation(projectId, selectedFilePath);
      setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
      toast.dismiss();
      toast.success("Documentation generated successfully");
      
      // Open MD preview
      setIsMdPreviewOpen(true);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate documentation");
      console.error(error);
    }
  };
  
  const handleDownloadDoc = (projectId: string) => {
    try {
      downloadDocumentation(projectId);
    } catch (error) {
      toast.error("Failed to download documentation");
      console.error(error);
    }
  };
  
  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) 
    : null;
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {projects.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center max-w-md glass-panel p-8 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">No Projects Yet</h2>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first project. Projects help you organize your documentation.
                </p>
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectTile
                  key={project.id}
                  project={project}
                  onImportRepo={handleImportRepo}
                  onGenerateDoc={handleGenerateDoc}
                  onDownloadDoc={handleDownloadDoc}
                  onViewStructure={handleViewStructure}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      
      {/* Modals */}
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreateProject={handleCreateProject} 
      />
      
      {selectedProjectId && (
        <>
          <ImportRepoModal 
            isOpen={isImportModalOpen} 
            onClose={() => setIsImportModalOpen(false)} 
            onImport={handleImportSubmit}
            projectId={selectedProjectId}
          />
          
          {selectedProject?.repository?.structure && (
            <FolderStructure 
              isOpen={isStructureModalOpen} 
              onClose={() => setIsStructureModalOpen(false)} 
              fileStructure={selectedProject.repository.structure}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFilePath || undefined}
            />
          )}
          
          {selectedProject?.documentation?.content && (
            <MdPreview 
              isOpen={isMdPreviewOpen} 
              onClose={() => setIsMdPreviewOpen(false)} 
              content={selectedProject.documentation.content}
              onDownload={() => handleDownloadDoc(selectedProjectId)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
