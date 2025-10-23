import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  LayoutDashboard, 
  Plus, 
  FolderOpen, 
  LogOut,
  Eye,
  Edit,
  Trash2,
  Tag,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Star,
  Heart,
  Zap,
  Globe,
  Users,
  Award,
  Target,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AddProject from './AddProject';
import EditProject from './EditProject';
import ConfirmDialog from '../../components/ConfirmDialog';
import nextwaveLogo from '@/assets/nextwave-header.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'analytics' | 'settings'>('overview');
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    projectId: string | null;
    projectName: string;
    isLoading: boolean;
  }>({
    isOpen: false,
    projectId: null,
    projectName: '',
    isLoading: false
  });

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setDeleteConfirm({
        isOpen: true,
        projectId,
        projectName: project.name,
        isLoading: false
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.projectId) return;

    setDeleteConfirm(prev => ({ ...prev, isLoading: true }));

    try {
      await deleteProject(deleteConfirm.projectId);
      toast.success('Project deleted successfully! Portfolio will update automatically.');
      setDeleteConfirm({
        isOpen: false,
        projectId: null,
        projectName: '',
        isLoading: false
      });
    } catch (error) {
      toast.error('Failed to delete project');
      setDeleteConfirm(prev => ({ ...prev, isLoading: false }));
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({
      isOpen: false,
      projectId: null,
      projectName: '',
      isLoading: false
    });
  };

  const handleEditProject = (projectId: string) => {
    setEditingProject(projectId);
  };

  const handleCloseEdit = () => {
    setEditingProject(null);
  };

  const handleCloseAdd = () => {
    setShowAddProject(false);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Sample data for demonstration
  const stats = {
    totalProjects: 24,
    publishedProjects: 18,
    draftProjects: 6,
    totalViews: 12543,
    categories: 5
  };

  const recentProjects = [
    {
      id: '1',
      name: 'Luxury Brand Identity',
      client: 'Luxe Living Co.',
      type: 'Branding',
      status: 'published',
      year: 2024,
      image: '/src/assets/brand-identity.png'
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      client: 'Fashion Forward',
      type: 'Web Design',
      status: 'published',
      year: 2024,
      image: '/src/assets/e-commerce-platform.png'
    },
    {
      id: '3',
      name: 'Digital Campaign',
      client: 'TechStart Inc.',
      type: 'Advertising',
      status: 'draft',
      year: 2023,
      image: '/src/assets/advertising-campaign.png'
    }
  ];

  return (
    <div className="min-h-screen bg-pure-black text-pure-white" dir="ltr">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-pure-black border-r border-champagne-gold/20 shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-champagne-gold/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-champagne-gold rounded-xl flex items-center justify-center shadow-lg p-1.5">
                <img 
                  src={nextwaveLogo} 
                  alt="NextWave Logo" 
                  className="w-full h-full object-contain brightness-0"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-champagne-gold">
                  NextWave
                </h2>
                <p className="text-sm text-pure-white/70">Admin Dashboard</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-champagne-gold/10 rounded-xl border border-champagne-gold/20">
              <p className="text-sm text-pure-white/80">
                Welcome back, <span className="font-semibold text-champagne-gold">Admin</span>
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-champagne-gold text-pure-black shadow-lg' 
                      : 'text-pure-white/70 hover:bg-champagne-gold/10 hover:text-champagne-gold'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    isActive 
                      ? 'bg-pure-black/20' 
                      : 'bg-pure-white/10 group-hover:bg-champagne-gold/20'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-pure-black rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="p-4 border-t border-champagne-gold/20">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-champagne-gold/10 rounded-lg border border-champagne-gold/20">
                <div className="text-2xl font-bold text-champagne-gold">{stats.totalProjects}</div>
                <div className="text-xs text-champagne-gold/80">Total Projects</div>
              </div>
              <div className="p-3 bg-champagne-gold/10 rounded-lg border border-champagne-gold/20">
                <div className="text-2xl font-bold text-champagne-gold">{stats.publishedProjects}</div>
                <div className="text-xs text-champagne-gold/80">Published</div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-champagne-gold/20">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-pure-white border-champagne-gold/30 hover:bg-champagne-gold/10 hover:border-champagne-gold rounded-xl transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-4xl font-bold text-champagne-gold">
                        Dashboard Overview
                      </h1>
                      <p className="text-pure-white/70 mt-2 text-lg">Welcome to your admin dashboard</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="rounded-xl border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/10">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/10">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-pure-black/40 border-champagne-gold/30 hover:shadow-lg hover:border-champagne-gold/50 hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-champagne-gold">Total Projects</CardTitle>
                      <div className="p-2 bg-champagne-gold rounded-lg">
                        <FolderOpen className="h-4 w-4 text-pure-black" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-champagne-gold">{stats.totalProjects}</div>
                      <p className="text-xs text-champagne-gold/80 mt-1">
                        {stats.publishedProjects} published, {stats.draftProjects} drafts
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-pure-black/40 border-champagne-gold/30 hover:shadow-lg hover:border-champagne-gold/50 hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-champagne-gold">Published</CardTitle>
                      <div className="p-2 bg-champagne-gold rounded-lg">
                        <Eye className="h-4 w-4 text-pure-black" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-champagne-gold">{stats.publishedProjects}</div>
                      <p className="text-xs text-champagne-gold/80 mt-1">
                        Visible on portfolio
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-pure-black/40 border-champagne-gold/30 hover:shadow-lg hover:border-champagne-gold/50 hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-champagne-gold">Categories</CardTitle>
                      <div className="p-2 bg-champagne-gold rounded-lg">
                        <Tag className="h-4 w-4 text-pure-black" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-champagne-gold">{stats.categories}</div>
                      <p className="text-xs text-champagne-gold/80 mt-1">
                        Different types
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-pure-black/40 border-champagne-gold/30 hover:shadow-lg hover:border-champagne-gold/50 hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-champagne-gold">Total Views</CardTitle>
                      <div className="p-2 bg-champagne-gold rounded-lg">
                        <TrendingUp className="h-4 w-4 text-pure-black" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-champagne-gold">{stats.totalViews.toLocaleString()}</div>
                      <p className="text-xs text-champagne-gold/80 mt-1">
                        Portfolio views
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Projects */}
                <Card className="bg-pure-black/40 border-champagne-gold/20">
                  <CardHeader>
                    <CardTitle className="text-champagne-gold">Recent Projects</CardTitle>
                    <CardDescription className="text-pure-white/70">Your latest project additions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border border-champagne-gold/20 rounded-lg bg-pure-black/20 hover:bg-champagne-gold/5 transition-all duration-300">
                          <div className="flex items-center space-x-4">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-12 h-12 rounded-lg object-cover border border-champagne-gold/30"
                            />
                            <div>
                              <h4 className="font-medium text-pure-white">{project.name}</h4>
                              <p className="text-sm text-pure-white/70">{project.client}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={project.status === 'published' ? 'default' : 'secondary'}
                              className={project.status === 'published' ? 'bg-champagne-gold text-pure-black' : 'bg-pure-white/20 text-pure-white/70'}
                            >
                              {project.status}
                            </Badge>
                            <span className="text-sm text-pure-white/70">{project.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'projects' && (
              <>
                <div className="mb-8 flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-champagne-gold">Manage Projects ({projects.length})</h1>
                    <p className="text-pure-white/70 mt-2">View and manage your portfolio projects</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.open('/portfolio', '_blank')}
                      variant="outline"
                      className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Portfolio
                    </Button>
                    <Button
                      onClick={() => setShowAddProject(true)}
                      className="bg-champagne-gold hover:bg-champagne-gold/90 text-pure-black font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </div>

                {showAddProject && (
                  <div className="mb-8">
                    <AddProject onSuccess={handleCloseAdd} />
                  </div>
                )}

                {editingProject && (
                  <div className="mb-8">
                    <EditProject 
                      projectId={editingProject} 
                      onSuccess={handleCloseEdit}
                      onCancel={handleCloseEdit}
                    />
                  </div>
                )}

                {/* Projects Table */}
                {projects.length > 0 ? (
                  <Card className="bg-pure-black/40 border-champagne-gold/20">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full">
                          <thead className="bg-champagne-gold/10 border-b border-champagne-gold/20">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-champagne-gold uppercase tracking-wider">
                                Project
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-champagne-gold uppercase tracking-wider">
                                Type
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-champagne-gold uppercase tracking-wider">
                                Client
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-champagne-gold uppercase tracking-wider">
                                Year
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-champagne-gold uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-champagne-gold uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-pure-black/20 divide-y divide-champagne-gold/10">
                            {projects.map((project) => (
                              <tr key={project.id} className="hover:bg-champagne-gold/10 transition-all duration-300">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <img
                                      src={project.coverImage}
                                      alt={project.name}
                                      className="w-12 h-12 rounded-lg object-cover mr-4 border border-champagne-gold/30"
                                    />
                                    <div>
                                      <div className="text-sm font-medium text-pure-white">
                                        {project.name}
                                      </div>
                                      <div className="text-sm text-pure-white/70 truncate max-w-xs">
                                        {project.projectType} project
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge variant="outline" className="capitalize border-champagne-gold/30 text-champagne-gold">
                                    {project.projectType}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-pure-white/70">
                                  {project.clientName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-pure-white/70">
                                  {project.year}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge 
                                    variant={project.status === 'published' ? 'default' : 'secondary'}
                                    className={project.status === 'published' ? 'bg-champagne-gold text-pure-black' : 'bg-pure-white/20 text-pure-white/70'}
                                  >
                                    {project.status}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditProject(project.id)}
                                    className="border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold/20 hover:border-champagne-gold/60 transition-all duration-200"
                                  >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleDeleteProject(project.id)}
                                      className="text-red-400 border-red-400/30 hover:bg-red-400/20 hover:border-red-400/60 transition-all duration-200"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-pure-black/40 border-champagne-gold/20">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FolderOpen className="w-16 h-16 text-pure-white/40 mb-4" />
                      <h3 className="text-xl font-semibold text-pure-white mb-2">No Projects Yet</h3>
                      <p className="text-pure-white/60 text-center mb-6">
                        Get started by adding your first project to showcase your work.
                      </p>
                      <Button 
                        onClick={() => setShowAddProject(true)}
                        className="bg-champagne-gold hover:bg-champagne-gold/90 text-pure-black font-semibold"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Project
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {activeTab === 'analytics' && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-champagne-gold">Analytics</h1>
                  <p className="text-pure-white/70 mt-2">Track your portfolio performance</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-pure-black/40 border-champagne-gold/20">
                    <CardHeader>
                      <CardTitle className="text-champagne-gold">Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-pure-white/70">Total Views</span>
                          <span className="text-champagne-gold font-semibold">{stats.totalViews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-pure-white/70">Unique Visitors</span>
                          <span className="text-champagne-gold font-semibold">8,432</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-pure-white/70">Bounce Rate</span>
                          <span className="text-champagne-gold font-semibold">32%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-pure-black/40 border-champagne-gold/20">
                    <CardHeader>
                      <CardTitle className="text-champagne-gold">Top Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentProjects.slice(0, 3).map((project, index) => (
                          <div key={project.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-champagne-gold/20 rounded-full flex items-center justify-center">
                                <span className="text-champagne-gold font-semibold text-sm">{index + 1}</span>
                              </div>
                              <span className="text-pure-white/70">{project.name}</span>
                            </div>
                            <span className="text-champagne-gold font-semibold">1,234 views</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-champagne-gold">Settings</h1>
                  <p className="text-pure-white/70 mt-2">Manage your dashboard preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-pure-black/40 border-champagne-gold/20">
                    <CardHeader>
                      <CardTitle className="text-champagne-gold">General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-pure-white/70">Email Notifications</span>
                        <Button size="sm" variant="outline" className="border-champagne-gold/30 text-champagne-gold">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-pure-white/70">Dark Mode</span>
                        <Button size="sm" variant="outline" className="border-champagne-gold/30 text-champagne-gold">
                          Active
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-pure-black/40 border-champagne-gold/20">
                    <CardHeader>
                      <CardTitle className="text-champagne-gold">Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-pure-white/70">Admin User</span>
                        <span className="text-champagne-gold">admin@nextwave.com</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-pure-white/70">Last Login</span>
                        <span className="text-champagne-gold">Today</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${deleteConfirm.projectName}"? This action cannot be undone and the project will be permanently removed from your portfolio.`}
        confirmText="Delete Project"
        cancelText="Cancel"
        type="danger"
        isLoading={deleteConfirm.isLoading}
      />
    </div>
  );
};

export default Dashboard;
