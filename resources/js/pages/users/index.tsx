import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

interface Props {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }: Props) {
    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case 'admin':
                return 'destructive';
            case 'driver':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">Users</h1>
                </div>
                
                <div className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs uppercase bg-muted dark:bg-gray-800 text-muted-foreground">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">User</th>
                                    <th scope="col" className="px-6 py-3 text-left">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left">Role</th>
                                    <th scope="col" className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr className="border-b dark:border-gray-800">
                                        <td colSpan={4} className="px-6 py-4 text-center text-muted-foreground">No users found</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.id} className="border-b dark:border-gray-800 hover:bg-muted/50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {user.avatar ? (
                                                        <img 
                                                            src={user.avatar} 
                                                            alt={user.name}
                                                            className="h-8 w-8 rounded-full mr-3"
                                                        />
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                                                            <span className="text-xs font-medium">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <Link href={`/users/${user.id}`} className="hover:underline text-foreground font-medium">
                                                        {user.name}
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-foreground">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <Link href={`/users/${user.id}/edit`}>
                                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
