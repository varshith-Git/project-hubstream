
import { toast } from "sonner";
import { Project, Repository, FileNode } from "./projectTypes";

// Mock data - This would be replaced with actual API calls in a real app
let PROJECTS: Project[] = [
  {
    id: "1",
    name: "Sample Project",
    createdAt: new Date().toISOString(),
    repositories: [],
  },
];

// Get all projects
export const getProjects = (): Project[] => {
  return PROJECTS;
};

// Create a new project
export const createProject = (name: string): Project => {
  if (!name.trim()) {
    throw new Error("Project name is required");
  }
  
  const newProject: Project = {
    id: Date.now().toString(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    repositories: [],
  };
  
  PROJECTS = [...PROJECTS, newProject];
  toast.success("Project created successfully");
  return newProject;
};

// Import repository to project
export const importRepository = (
  projectId: string, 
  repoUrl: string, 
  repoType: 'public' | 'private' | 'local',
  source: 'github' | 'bitbucket' | 'local'
): Project => {
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    throw new Error("Project not found");
  }

  // Get repository name from URL or use a placeholder for local
  const repoName = source === 'local' 
    ? 'Local Repository' 
    : repoUrl.split('/').pop() || 'Repository';
  
  // Mock folder structure - In reality, this would come from an API call
  const mockStructure: FileNode[] = [
    {
      name: 'src',
      type: 'folder',
      path: 'src',
      children: [
        {
          name: 'components',
          type: 'folder',
          path: 'src/components',
          children: [
            { name: 'Header.tsx', type: 'file', path: 'src/components/Header.tsx' },
            { name: 'Footer.tsx', type: 'file', path: 'src/components/Footer.tsx' },
          ]
        },
        {
          name: 'pages',
          type: 'folder',
          path: 'src/pages',
          children: [
            { name: 'index.tsx', type: 'file', path: 'src/pages/index.tsx' },
            { name: 'about.tsx', type: 'file', path: 'src/pages/about.tsx' },
          ]
        },
        { name: 'App.tsx', type: 'file', path: 'src/App.tsx' },
        { name: 'main.tsx', type: 'file', path: 'src/main.tsx' },
      ]
    },
    {
      name: 'public',
      type: 'folder',
      path: 'public',
      children: [
        { name: 'favicon.ico', type: 'file', path: 'public/favicon.ico' },
        { name: 'robots.txt', type: 'file', path: 'public/robots.txt' },
      ]
    },
    { name: 'package.json', type: 'file', path: 'package.json' },
    { name: 'README.md', type: 'file', path: 'README.md' },
  ];
  
  // Create a new repository object
  const newRepository: Repository = {
    id: Date.now().toString(),
    url: repoUrl,
    type: repoType,
    source: source,
    name: repoName,
    structure: mockStructure,
  };
  
  // Update the project with new repository
  const updatedProject = {
    ...project,
    repositories: [...project.repositories, newRepository],
  };
  
  // Update projects array
  PROJECTS = PROJECTS.map(p => p.id === projectId ? updatedProject : p);
  
  toast.success("Repository imported successfully");
  return updatedProject;
};

// Generate documentation for a project
export const generateDocumentation = async (
  projectId: string, 
  repoId: string,
  filePath: string
): Promise<Project> => {
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    throw new Error("Project not found");
  }
  
  // Mock file content - would actually be fetched from the repository
  const mockFileContent = `# ${project.name} Documentation

This is a mock file content. In a real app, this would be the actual content of the file
from the repository.

## Getting Started

1. Clone the repository
2. Install dependencies
3. Run the development server

## Features

- Feature 1: Lorem ipsum dolor sit amet
- Feature 2: Consectetur adipiscing elit
- Feature 3: Sed do eiusmod tempor incididunt ut labore

## Code Example

\`\`\`typescript
const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};
\`\`\`

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/users | GET | Get all users |
| /api/users/:id | GET | Get user by ID |
| /api/projects | POST | Create a new project |`;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Update the project with documentation
  const updatedProject = {
    ...project,
    documentation: {
      generated: true,
      content: mockFileContent,
      sourceRepo: repoId
    }
  };
  
  // Update projects array
  PROJECTS = PROJECTS.map(p => p.id === projectId ? updatedProject : p);
  
  toast.success("Documentation generated successfully");
  return updatedProject;
};

// Download documentation as MD file
export const downloadDocumentation = (projectId: string): void => {
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project || !project.documentation?.content) {
    toast.error("No documentation available");
    return;
  }
  
  // Create a blob from the documentation content
  const blob = new Blob([project.documentation.content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name}-documentation.md`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
  
  toast.success("Documentation downloaded");
};

// Get project by id
export const getProjectById = (projectId: string): Project | undefined => {
  return PROJECTS.find(p => p.id === projectId);
};

// Get repository by id
export const getRepositoryById = (
  projectId: string, 
  repoId: string
): Repository | undefined => {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return undefined;
  
  return project.repositories.find(r => r.id === repoId);
};
