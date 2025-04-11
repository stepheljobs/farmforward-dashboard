import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, ClipboardList, UserCog, DollarSign, FileText, Settings, Sprout, Truck, Receipt, LineChart } from 'lucide-react';
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
        title: 'Crop Arrivals',
        href: '/crop-arrivals',
        icon: Truck,
    },
    {
        title: 'Sales Invoices',
        href: '/sales-invoices',
        icon: Receipt,
    },
    {
        title: 'Sales',
        href: '/sales',
        icon: DollarSign,
    }
];

const consultantsNavItems: NavItem[] = [
    {
        title: 'Crop Planner',
        href: '/crop-planners',
        icon: Sprout,
    },
    {
        title: 'Crop Arrivals',
        href: '/crop-arrivals',
        icon: Truck,
    },
    {
        title: 'Crop Forecast',
        href: '/crop-forecast',
        icon: LineChart,
    },
];

const financeNavItems: NavItem[] = [
    {
        title: 'Financial Overview',
        href: '/financial-overview',
        icon: DollarSign,
    },
    {
        title: 'Sales',
        href: '/sales',
        icon: DollarSign,
    },
    {
        title: 'Withdrawal Requests',
        href: '/withdrawals-requests',
        icon: DollarSign,
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
