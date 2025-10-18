import React, { useState, useEffect } from 'react';
import { useProjects, PROJECT_TYPES, Project } from '../../contexts/ProjectContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '../../components/ImageUpload';

interface EditProjectProps {
  projectId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({ projectId, onSuccess, onCancel }) => {
  const { getProject, updateProject } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    purpose: '',
    clientName: '',
    year: new Date().getFullYear(),
    projectType: '',
    tags: [] as string[],
    coverImage: '',
    status: 'published' as 'draft' | 'published'
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const project = getProject(projectId);
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        purpose: project.purpose,
        clientName: project.clientName,
        year: project.year,
        projectType: project.projectType,
        tags: project.tags,
        coverImage: project.coverImage,
        status: project.status
      });
    }
  }, [projectId, getProject]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.projectType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await updateProject(projectId, formData);
      toast.success('Project updated successfully! Portfolio will update automatically.');
      onSuccess();
    } catch (error) {
      toast.error('Failed to update project');
      console.error('Error updating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-pure-black/40 border-champagne-gold/20">
      <CardHeader>
        <CardTitle className="text-champagne-gold">Edit Project</CardTitle>
        <CardDescription className="text-pure-white/70">
          Update project information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-pure-white/90">
                Project Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter project name"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-pure-white/90">
                Client Name *
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Enter client name"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-pure-white/90">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter project description"
              className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-pure-white/90">
              Project Purpose
            </Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              placeholder="Describe the purpose and goals of this project"
              className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectType" className="text-pure-white/90">
                Project Type *
              </Label>
              <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                <SelectTrigger className="bg-pure-black/20 border-champagne-gold/30 text-pure-white focus:border-champagne-gold">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent className="bg-pure-black border-champagne-gold/30">
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="text-pure-white hover:bg-champagne-gold/20">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-pure-white/90">
                Year
              </Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                min="2020"
                max={new Date().getFullYear() + 1}
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-pure-white/90">
              Cover Image
            </Label>
            <ImageUpload
              value={formData.coverImage}
              onChange={(value) => handleInputChange('coverImage', value)}
              placeholder="Enter image URL or upload from device"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-pure-white/90">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-pure-black/20 border-champagne-gold/30 text-pure-white placeholder:text-pure-white/50 focus:border-champagne-gold"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button
                type="button"
                onClick={handleAddTag}
                variant="outline"
                className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-champagne-gold/20 text-champagne-gold border-champagne-gold/30"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:text-pure-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-pure-white/90">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => handleInputChange('status', value)}>
              <SelectTrigger className="bg-pure-black/20 border-champagne-gold/30 text-pure-white focus:border-champagne-gold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-pure-black border-champagne-gold/30">
                <SelectItem value="published" className="text-pure-white hover:bg-champagne-gold/20">
                  Published
                </SelectItem>
                <SelectItem value="draft" className="text-pure-white hover:bg-champagne-gold/20">
                  Draft
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-champagne-gold hover:bg-champagne-gold/90 text-pure-black font-semibold"
            >
              {isLoading ? 'Updating...' : 'Update Project'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProject;
