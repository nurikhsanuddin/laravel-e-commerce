import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { Head, useForm, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
}

interface Props {
    user: User;
    availableRoles: string[];
}

export default function Edit({ user, availableRoles }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

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
            title: `Edit ${user.name}`,
            href: `/users/${user.id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User: ${user.name}`} />
            
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/users">
                        <Button variant="outline" size="icon">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground">Edit User</h1>
                </div>
                
                <div className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-6">
                        {user.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="h-16 w-16 rounded-full mr-6"
                            />
                        ) : (
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mr-6">
                                <span className="text-xl font-medium text-foreground">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">
                                Name
                            </label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="bg-background dark:bg-sidebar-background/70"
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="bg-background dark:bg-sidebar-background/70"
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        
                        <div className="grid gap-2">
                            <label htmlFor="role" className="text-sm font-medium text-foreground">
                                Role
                            </label>
                            <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                                <SelectTrigger id="role" className="bg-background dark:bg-sidebar-background/70">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableRoles.map((role) => (
                                        <SelectItem key={role} value={role} className="capitalize">
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
                        </div>
                        
                        <div className="flex justify-end mt-4">
                            <Button type="submit" disabled={processing}>
                                Update User
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
