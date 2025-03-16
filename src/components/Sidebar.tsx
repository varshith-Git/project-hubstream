
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  FileText, 
  FolderKanban, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  active, 
  collapsed 
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center py-3 px-3 my-1 rounded-lg transition-all duration-300 hover:bg-accent/10",
        active ? "bg-accent/15 text-accent" : "text-foreground",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <Icon className={cn(
        "flex-shrink-0 w-5 h-5 transition-all duration-300",
        active ? "text-accent" : "text-muted-foreground group-hover:text-foreground",
        collapsed ? "mx-auto" : "mr-3"
      )} />
      
      {!collapsed && (
        <span className="text-sm font-medium animate-slide-in">{label}</span>
      )}
      
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-background border border-border rounded-md z-50 opacity-0 -translate-x-3 pointer-events-none scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-200">
          <span className="text-sm whitespace-nowrap">{label}</span>
        </div>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-border">
        {!collapsed && (
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80 animate-slide-in">
            DocGen.AI
          </span>
        )}
        
        <button 
          onClick={toggleCollapse}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-all",
            collapsed ? "mx-auto" : "ml-auto"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <div className="flex flex-col flex-1 py-4 px-2 overflow-y-auto scrollbar-thin">
        <SidebarItem 
          icon={FileText} 
          label="DocGen" 
          to="/" 
          active={location.pathname === "/"} 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={FolderKanban} 
          label="Projects" 
          to="/dashboard" 
          active={location.pathname === "/dashboard"} 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={CreditCard} 
          label="Billing" 
          to="/billing" 
          active={location.pathname === "/billing"} 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          to="/settings" 
          active={location.pathname === "/settings"} 
          collapsed={collapsed} 
        />
      </div>
      
      <div className="p-4 border-t border-border">
        <button className={cn(
          "flex items-center w-full py-2 px-3 rounded-lg transition-all duration-200 text-destructive hover:bg-destructive/10",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
