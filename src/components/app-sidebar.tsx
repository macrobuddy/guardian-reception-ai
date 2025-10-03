import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { Badge } from './ui/badge';
import {
  LayoutDashboard,
  Phone,
  Settings,
  Users,
  CreditCard,
  BarChart3,
  Puzzle,
  Lightbulb,
  Shield,
  Crown
} from 'lucide-react';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Phone, label: "Call Logs", path: "/dashboard/logs" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: CreditCard, label: "Billing", path: "/dashboard/billing" },
    { icon: Users, label: "Team", path: "/dashboard/team" },
    { icon: Puzzle, label: "Integrations", path: "/dashboard/integrations" },
    { icon: Lightbulb, label: "Help", path: "/dashboard/help" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-gray-800">
      <SidebarContent className="bg-gray-900">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center glow-white">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-semibold">Guardian AI</span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 text-xs uppercase tracking-wide px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={isActive(item.path)}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:glow-white"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 mb-2">Current Plan</div>
          <Badge className="bg-white text-black hover:bg-gray-100 glow-white">
            <Crown className="w-3 h-3 mr-1" />
            Professional
          </Badge>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
