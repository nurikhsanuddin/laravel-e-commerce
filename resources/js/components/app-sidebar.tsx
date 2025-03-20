import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, BoxIcon, ChartBarStacked, Folder, LayoutGrid, ShoppingBag, Truck, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        roles: ['admin'], // Everyone can see dashboard
    },
    {
        title: 'Manajemen User',
        href: '/users',
        icon: Users,
        roles: ['admin'], // Only admin can see user management
    },
    {
        title: 'Manajemen Kategori',
        href: '/categories',
        icon: ChartBarStacked,
        roles: ['admin'], // Only admin can see category management
    },
    {
        title: 'Manajemen Produk',
        href: '/products',
        icon: BoxIcon,
        roles: ['admin'], // Only admin can see product management
    },
    {
        title: 'Pesanan Masuk',
        href: '/admin/orders',
        icon: ShoppingBag,
        roles: ['admin'], // Only admin can see incoming orders
    },

    {
        title: 'Pesanan Saya',
        href: '/driver/orders',
        icon: Truck,
        roles: ['driver'], // Only driver can see their orders
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

// get user data from the session
// const window: any = global;
// console.log('User data:', window.auth);

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    console.log('User   :', auth.user);
    console.log('User Role', auth.user.role);
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
