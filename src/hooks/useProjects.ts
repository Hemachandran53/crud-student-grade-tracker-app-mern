
import { useState, useEffect } from 'react';
import { Project } from '@/types/project';

// Mock data for development
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX design and improved performance.',
    status: 'active',
    priority: 'high',
    progress: 75,
    dueDate: '2024-07-15T00:00:00.000Z',
    teamMembers: [
      { id: '1', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b7e0b6b5?w=32&h=32&fit=crop&crop=face', role: 'Product Manager' },
      { id: '2', name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face', role: 'Frontend Developer' },
      { id: '3', name: 'Carol Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', role: 'UI/UX Designer' }
    ],
    createdAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-06-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms with real-time synchronization.',
    status: 'active',
    priority: 'high',
    progress: 45,
    dueDate: '2024-08-30T00:00:00.000Z',
    teamMembers: [
      { id: '4', name: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', role: 'Mobile Developer' },
      { id: '5', name: 'Emma Brown', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face', role: 'QA Engineer' }
    ],
    createdAt: '2024-05-15T00:00:00.000Z',
    updatedAt: '2024-06-10T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integration with third-party APIs for payment processing and data synchronization.',
    status: 'on-hold',
    priority: 'medium',
    progress: 30,
    dueDate: '2024-07-01T00:00:00.000Z',
    teamMembers: [
      { id: '6', name: 'Frank Miller', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', role: 'Backend Developer' }
    ],
    createdAt: '2024-05-01T00:00:00.000Z',
    updatedAt: '2024-06-05T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Documentation Update',
    description: 'Comprehensive update of technical documentation and user guides.',
    status: 'completed',
    priority: 'low',
    progress: 100,
    dueDate: '2024-06-15T00:00:00.000Z',
    teamMembers: [
      { id: '7', name: 'Grace Lee', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face', role: 'Technical Writer' }
    ],
    createdAt: '2024-04-01T00:00:00.000Z',
    updatedAt: '2024-06-15T00:00:00.000Z'
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const createProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === updatedProject.id
          ? { ...updatedProject, updatedAt: new Date().toISOString() }
          : project
      )
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject
  };
}
