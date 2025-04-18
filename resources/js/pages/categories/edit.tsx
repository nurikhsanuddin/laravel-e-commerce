import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Categories',
            href: '/categories',
        },
        {
            title: 'Edit Category',
            href: `/categories/${category.id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/categories/${category.id}`);
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Category" />
            
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/categories">
                        <Button variant="outline" size="icon">
                            <ArrowLeftIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-foreground">Edit Category</h1>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm p-6">
                    <div className="grid gap-6">
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
                            <label htmlFor="description" className="text-sm font-medium text-foreground">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                                className="bg-background dark:bg-sidebar-background/70"
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>
                        
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Update Category
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}
