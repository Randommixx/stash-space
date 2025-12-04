import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Camera, Search, ShoppingCart, Calendar, User, Star, Package } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
const menuItems = [{
  title: 'Dashboard',
  url: '/customer/dashboard',
  icon: Package
}, {
  title: 'Browse Equipment',
  url: '/customer/browse',
  icon: Search
}, {
  title: 'My Bookings',
  url: '/customer/bookings',
  icon: Calendar
}, {
  title: 'Favorites',
  url: '/customer/favorites',
  icon: Star
}, {
  title: 'Profile',
  url: '/customer/profile',
  icon: User
}];
export const CustomerSidebar: React.FC = () => {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  const isActive = (path: string) => location.pathname === path;
  return <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent className="rounded-none border-black/[0.97] text-black/[0.98]">
        <SidebarGroup>
          <SidebarGroupLabel>Customer Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="border border-solid border-black/[0.57] text-black/95">
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({
                  isActive
                }) => isActive ? "bg-primary text-primary-foreground font-bold" : "text-foreground hover:bg-accent/50"}>
                      <item.icon className="mr-2 h-4 w-4 rounded-sm bg-black/0 text-black/[0.96]" />
                      {!isCollapsed && <span className="text-popover-foreground">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};