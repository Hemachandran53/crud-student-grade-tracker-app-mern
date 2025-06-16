
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MoreHorizontal, 
  Calendar, 
  MessageCircle,
  Paperclip,
  Flag,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'done': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleTaskCompletion = () => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    onUpdate({ ...task, status: newStatus });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 bg-white/60 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <Checkbox 
            checked={task.status === 'done'}
            onCheckedChange={toggleTaskCompletion}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h4 className={`font-medium leading-tight ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h4>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                  <DropdownMenuItem onClick={() => onUpdate(task)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(task.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getStatusColor(task.status)}>
                  {task.status.replace('-', ' ')}
                </Badge>
                
                <Flag className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
              </div>

              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {task.attachments > 0 && (
                  <div className="flex items-center">
                    <Paperclip className="h-3 w-3 mr-1" />
                    {task.attachments}
                  </div>
                )}
                
                {task.comments > 0 && (
                  <div className="flex items-center">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {task.comments}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
          </div>

          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback className="text-xs">
                {task.assignee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
