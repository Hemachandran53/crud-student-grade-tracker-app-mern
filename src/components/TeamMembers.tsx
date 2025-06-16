
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus, MoreHorizontal } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b7e0b6b5?w=32&h=32&fit=crop&crop=face",
    status: "online",
    tasksCount: 8
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
    status: "busy",
    tasksCount: 12
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    status: "online",
    tasksCount: 6
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    status: "away",
    tasksCount: 9
  },
  {
    id: 5,
    name: "Emma Brown",
    role: "QA Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    status: "online",
    tasksCount: 4
  }
];

export function TeamMembers() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <Button size="sm" variant="outline" className="bg-white/50">
            <Plus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${getStatusColor(member.status)}`} />
              </div>
              
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {member.tasksCount} tasks
              </Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
