
export interface TaskAssignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  projectId?: string;
  assignee: TaskAssignee | null;
  dueDate: string;
  attachments: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}
