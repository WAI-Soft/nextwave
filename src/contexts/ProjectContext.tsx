import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  purpose: string;
  clientName: string;
  year: number;
  projectType: string;
  tags: string[];
  coverImage: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'slug' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<Project>;
  updateProject: (id: string, project: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (id: string) => Project | undefined;
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

// Project types that match the existing portfolio
const PROJECT_TYPES = [
  'branding',
  'websites', 
  'advertising',
  'logos',
  'photography'
];

// Generate slug from project name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('nextwave_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      }
    } else {
      // Initialize with some sample projects
      const sampleProjects: Project[] = [
        {
          id: '1',
          name: 'Luxury Brand Identity',
          description: 'Complete brand identity design for premium lifestyle brand',
          purpose: 'To create a sophisticated and memorable brand identity that reflects luxury and elegance',
          clientName: 'Luxe Living Co.',
          year: 2024,
          projectType: 'branding',
          tags: ['Logo Design', 'Brand Guidelines', 'Color Palette'],
          coverImage: '/src/assets/brand-identity.png',
          slug: 'luxury-brand-identity',
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'E-commerce Platform',
          description: 'Modern responsive website with seamless user experience',
          purpose: 'To develop a user-friendly e-commerce platform that drives sales and customer engagement',
          clientName: 'Fashion Forward',
          year: 2024,
          projectType: 'websites',
          tags: ['Web Design', 'UX/UI', 'E-commerce'],
          coverImage: '/src/assets/e-commerce-platform.png',
          slug: 'e-commerce-platform',
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Digital Campaign',
          description: 'Multi-platform advertising campaign with stunning visuals',
          purpose: 'To create an impactful digital advertising campaign that increases brand awareness',
          clientName: 'TechStart Inc.',
          year: 2023,
          projectType: 'advertising',
          tags: ['Digital Ads', 'Social Media', 'Campaign'],
          coverImage: '/src/assets/advertising-campaign.png',
          slug: 'digital-campaign',
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setProjects(sampleProjects);
      localStorage.setItem('nextwave_projects', JSON.stringify(sampleProjects));
    }
    setIsLoading(false);
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('nextwave_projects', JSON.stringify(projects));
    }
  }, [projects, isLoading]);

  const addProject = async (projectData: Omit<Project, 'id' | 'slug' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      slug: generateSlug(projectData.name),
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const updatedProject = projects.find(p => p.id === id);
    if (!updatedProject) {
      throw new Error('Project not found');
    }

    const updated = {
      ...updatedProject,
      ...projectData,
      updatedAt: new Date().toISOString(),
      // Regenerate slug if name changed
      slug: projectData.name ? generateSlug(projectData.name) : updatedProject.slug
    };

    setProjects(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const deleteProject = async (id: string): Promise<void> => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const getProject = (id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  };

  const value: ProjectContextType = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    isLoading
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export { PROJECT_TYPES };
