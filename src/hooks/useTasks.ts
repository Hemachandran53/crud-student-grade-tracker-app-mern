
import { useState, useEffect } from 'react';
import { Task } from '@/types/task';

// Mock data for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design user authentication flow',
    description: 'Create wireframes and mockups for the user login and registration process.',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    assignee: {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-06-20T00:00:00.000Z',
    attachments: 3,
    comments: 5,
    createdAt: '2024-06-10T00:00:00.000Z',
    updatedAt: '2024-06-15T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Implement shopping cart functionality',
    description: 'Add items to cart, update quantities, and calculate totals.',
    status: 'todo',
    priority: 'high',
    projectId: '1',
    assignee: {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-06-25T00:00:00.000Z',
    attachments: 1,
    comments: 2,
    createdAt: '2024-06-12T00:00:00.000Z',
    updatedAt: '2024-06-12T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline.',
    status: 'review',
    priority: 'medium',
    projectId: '2',
    assignee: {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-06-18T00:00:00.000Z',
    attachments: 0,
    comments: 8,
    createdAt: '2024-06-08T00:00:00.000Z',
    updatedAt: '2024-06-14T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'Write unit tests',
    description: 'Create comprehensive unit tests for core functionality.',
    status: 'done',
    priority: 'medium',
    projectId: '2',
    assignee: {
      id: '5',
      name: 'Emma Brown',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-06-15T00:00:00.000Z',
    attachments: 2,
    comments: 3,
    createdAt: '2024-06-05T00:00:00.000Z',
    updatedAt: '2024-06-15T00:00:00.000Z'
  },
  {
    id: '5',
    title: 'Update API documentation',
    description: 'Document all REST API endpoints with examples.',
    status: 'todo',
    priority: 'low',
    projectId: '3',
    assignee: {
      id: '7',
      name: 'Grace Lee',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-06-30T00:00:00.000Z',
    attachments: 0,
    comments: 1,
    createdAt: '2024-06-13T00:00:00.000Z',
    updatedAt: '2024-06-13T00:00:00.000Z'
  },
  {
    id: '6',
    title: 'Performance optimization',
    description: 'Optimize database queries and improve page load times.',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    assignee: {
      id: '6',
      name: 'Frank Miller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-06-22T00:00:00.000Z',
    attachments: 4,
    comments: 12,
    createdAt: '2024-06-11T00:00:00.000Z',
    updatedAt: '2024-06-16T00:00:00.000Z'
  }
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks(mockTasks);
      setLoading(false);
    }, 800);
  }, []);

  const createTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id
          ? { ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask
  };
}
