
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, FileUp, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface ImportRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (url: string, type: 'public' | 'private' | 'local', source: 'github' | 'bitbucket' | 'local') => void;
  projectId: string;
}

const ImportRepoModal: React.FC<ImportRepoModalProps> = ({
  isOpen,
  onClose,
  onImport,
  projectId,
}) => {
  const [activeTab, setActiveTab] = useState<'github' | 'bitbucket' | 'local'>('github');
  const [repoUrl, setRepoUrl] = useState('');
  const [repoType, setRepoType] = useState<'public' | 'private'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'github' || activeTab === 'bitbucket') {
      if (!repoUrl.trim()) {
        toast.error('Repository URL is required');
        return;
      }
      
      // If private repo is selected and needs auth
      if (repoType === 'private' && !needsAuth) {
        setNeedsAuth(true);
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // For local upload, use a placeholder URL
      const url = activeTab === 'local' ? 'local://repository' : repoUrl;
      const type = activeTab === 'local' ? 'local' : repoType;
      
      onImport(url, type as 'public' | 'private' | 'local', activeTab);
      setRepoUrl('');
      setRepoType('public');
      setNeedsAuth(false);
      onClose();
    } catch (error) {
      toast.error('Failed to import repository');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLocalUpload = () => {
    toast.success('Local folder selected successfully');
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        onImport('local://repository', 'local', 'local');
        onClose();
      } catch (error) {
        toast.error('Failed to import local repository');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const renderGithubContent = () => (
    <div className="grid gap-4 py-4">
      {needsAuth ? (
        <div className="space-y-4">
          <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-md">
            <h3 className="text-sm font-medium mb-2">GitHub Authorization Required</h3>
            <p className="text-xs text-muted-foreground mb-4">
              To access your private repositories, you need to authorize with GitHub.
            </p>
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => {
                toast.success('GitHub authorization successful');
                setNeedsAuth(false);
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              Authorize GitHub
            </Button>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => setNeedsAuth(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-2">
            <Label htmlFor="repoUrl" className="text-sm">
              Repository URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="repoUrl"
              placeholder="https://github.com/username/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-background border-border focus-visible:ring-accent"
              autoFocus
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label className="text-sm">Repository Type</Label>
            <RadioGroup 
              value={repoType} 
              onValueChange={(value) => setRepoType(value as 'public' | 'private')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="text-sm font-normal cursor-pointer">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="text-sm font-normal cursor-pointer">Private (Own)</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );

  const renderBitbucketContent = () => (
    <div className="grid gap-4 py-4">
      {needsAuth ? (
        <div className="space-y-4">
          <div className="p-4 border border-blue-500/30 bg-blue-500/10 rounded-md">
            <h3 className="text-sm font-medium mb-2">Bitbucket Authorization Required</h3>
            <p className="text-xs text-muted-foreground mb-4">
              To access your private repositories, you need to authorize with Bitbucket.
            </p>
            <Button 
              size="sm" 
              className="w-full"
              onClick={() => {
                toast.success('Bitbucket authorization successful');
                setNeedsAuth(false);
              }}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Authorize Bitbucket
            </Button>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => setNeedsAuth(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-2">
            <Label htmlFor="repoUrl" className="text-sm">
              Repository URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="repoUrl"
              placeholder="https://bitbucket.org/username/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-background border-border focus-visible:ring-accent"
              autoFocus
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label className="text-sm">Repository Type</Label>
            <RadioGroup 
              value={repoType} 
              onValueChange={(value) => setRepoType(value as 'public' | 'private')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public-bb" />
                <Label htmlFor="public-bb" className="text-sm font-normal cursor-pointer">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private-bb" />
                <Label htmlFor="private-bb" className="text-sm font-normal cursor-pointer">Private (Own)</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );

  const renderLocalContent = () => (
    <div className="grid gap-4 py-4">
      <div className="text-center p-6 border-2 border-dashed border-border rounded-lg">
        <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-sm font-medium mb-2">Upload Local Repository</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Select a folder from your computer to import as a repository
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          webkitdirectory="true"
          directory=""
          onChange={handleLocalUpload}
        />
        <Button onClick={handleFileUpload}>
          Choose Folder
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel sm:max-w-[425px] border border-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <FolderGit2 className="h-5 w-5" />
            Import Repository
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Connect your project to a repository.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs 
            defaultValue="github" 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value as 'github' | 'bitbucket' | 'local');
              setNeedsAuth(false);
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="github" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                GitHub
              </TabsTrigger>
              <TabsTrigger value="bitbucket" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Bitbucket
              </TabsTrigger>
              <TabsTrigger value="local" className="flex items-center gap-1">
                <FileUp className="h-4 w-4" />
                Local
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="github">
              {renderGithubContent()}
            </TabsContent>
            
            <TabsContent value="bitbucket">
              {renderBitbucketContent()}
            </TabsContent>
            
            <TabsContent value="local">
              {renderLocalContent()}
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            {!needsAuth && activeTab !== 'local' && (
              <Button 
                type="submit" 
                disabled={isSubmitting || !repoUrl.trim()}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isSubmitting ? 'Importing...' : 'Import Repository'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRepoModal;
