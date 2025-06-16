
export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  dueDate: string;
  teamMembers: TeamMember[];
  createdAt: string;
  updatedAt: string;
}
