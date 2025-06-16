
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Users, 
  CheckCircle, 
  Calendar, 
  Settings, 
  HelpCircle,
  Activity,
  TrendingUp,
  Bell
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "projects", label: "Projects", icon: Users },
  { id: "tasks", label: "Tasks", icon: CheckCircle },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const bottomItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ProjectHub
              </h1>
              <p className="text-xs text-muted-foreground">Advanced CRUD App</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11 transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25" 
                    : "hover:bg-white/50 text-slate-600 hover:text-slate-900"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-4 border-t border-white/20">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-11 text-slate-600 hover:text-slate-900 hover:bg-white/50"
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}

          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/30 backdrop-blur-sm">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Project Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
