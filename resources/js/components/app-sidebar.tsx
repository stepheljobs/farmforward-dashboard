import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, ClipboardList, UserCog, DollarSign, FileText, Settings, Sprout } from 'lucide-react';
import AppLogo from './app-logo';

const operationsNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Farmers',
        href: '/farmers',
        icon: Users,
    },
    {
        title: 'Tasks',
        href: '/tasks',
        icon: ClipboardList,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
    },
];

const consultantsNavItems: NavItem[] = [
    {
        title: 'Crop Planner',
        href: '/crop-planners',
        icon: Sprout,
    },
    {
        title: 'Knowledge Base',
        href: '/knowledge-base',
        icon: BookOpen,
    },
    {
        title: 'Training',
        href: '/training',
        icon: Folder,
    },
];

const financeNavItems: NavItem[] = [
    {
        title: 'Financial Overview',
        href: '/finance',
        icon: DollarSign,
    },
    {
        title: 'Transactions',
        href: '/transactions',
        icon: FileText,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <div className="space-y-6">
                    <NavMain items={operationsNavItems} title="Operations" />
                    <NavMain items={consultantsNavItems} title="Consultants" />
                    <NavMain items={financeNavItems} title="Finance" />
                </div>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
