
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  MessageCircle, 
  UserPlus, 
  FileText,
  Clock
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "task_completed",
    user: {
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b7e0b6b5?w=32&h=32&fit=crop&crop=face",
      initials: "AJ"
    },
    action: "completed task",
    target: "Design System Updates",
    time: "2 minutes ago",
    icon: CheckCircle,
    iconColor: "text-green-500"
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Bob Smith",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face",
      initials: "BS"
    },
    action: "commented on",
    target: "Mobile App Redesign",
    time: "15 minutes ago",
    icon: MessageCircle,
    iconColor: "text-blue-500"
  },
  {
    id: 3,
    type: "member_added",
    user: {
      name: "Carol Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      initials: "CD"
    },
    action: "added",
    target: "David Wilson to E-commerce Platform",
    time: "1 hour ago",
    icon: UserPlus,
    iconColor: "text-purple-500"
  },
  {
    id: 4,
    type: "document_created",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      initials: "EW"
    },
    action: "created document",
    target: "API Documentation",
    time: "2 hours ago",
    icon: FileText,
    iconColor: "text-orange-500"
  }
];

export function RecentActivity() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <Icon className={`h-3 w-3 ${activity.iconColor}`} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  <span className="text-muted-foreground">{activity.action}</span>
                  {' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
