
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle, 
  Clock,
  Target
} from "lucide-react";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 from last month",
    trend: "up",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Completed Tasks",
    value: "89",
    change: "+12% from last week",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Team Members",
    value: "24",
    change: "+3 new members",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Pending Reviews",
    value: "7",
    change: "-2 from yesterday",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <Card key={stat.title} className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon className={`h-3 w-3 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
