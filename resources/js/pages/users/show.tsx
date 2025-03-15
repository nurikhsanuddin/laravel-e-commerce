import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    created_at: string;
}

interface Props {
    user: User;
}

export default function Show({ user }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: user.name,
            href: `/users/${user.id}`,
        },
    ];

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
            <Head title={`User: ${user.name}`} />
            
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/users">
                            <Button variant="outline" size="icon">
                                <ArrowLeftIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    </div>
                    <Link href={`/users/${user.id}/edit`}>
                        <Button variant="outline" size="sm">
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                </div>
                
                <div className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-6">
                        {user.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="h-24 w-24 rounded-full mr-6"
                            />
                        ) : (
                            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mr-6">
                                <span className="text-3xl font-medium text-foreground">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                            <p className="text-muted-foreground">{user.email}</p>
                            <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize mt-2">
                                {user.role}
                            </Badge>
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-foreground">User Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="text-foreground">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Role</p>
                            <p className="text-foreground capitalize">{user.role}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Member Since</p>
                            <p className="text-foreground">
                                {new Date(user.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
