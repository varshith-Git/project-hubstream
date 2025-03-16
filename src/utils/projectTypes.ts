
export interface Repository {
  id: string;
  url: string;
  type: 'public' | 'private' | 'local';
  source: 'github' | 'bitbucket' | 'local';
  name: string;
  structure?: FileNode[];
}

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  repositories: Repository[];
  documentation?: {
    generated: boolean;
    content?: string;
    sourceRepo?: string;
  };
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}
