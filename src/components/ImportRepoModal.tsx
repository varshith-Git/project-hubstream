
import React, { useState } from 'react';
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
import { Github } from 'lucide-react';
import { toast } from 'sonner';

interface ImportRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (url: string, type: 'public' | 'private') => void;
  projectId: string;
}

const ImportRepoModal: React.FC<ImportRepoModalProps> = ({
  isOpen,
  onClose,
  onImport,
  projectId,
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoType, setRepoType] = useState<'public' | 'private'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast.error('Repository URL is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onImport(repoUrl, repoType);
      setRepoUrl('');
      onClose();
    } catch (error) {
      toast.error('Failed to import repository');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel sm:max-w-[425px] border border-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium flex items-center gap-2">
            <Github className="h-5 w-5" />
            Import GitHub Repository
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Connect your project to a GitHub repository.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !repoUrl.trim()}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? 'Importing...' : 'Import Repository'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRepoModal;
