import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function Index({ categories }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            setIsDeleting(true);
            router.delete(`/categories/${id}`, {
                onFinish: () => setIsDeleting(false),
            });
        }
    };
    
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">Categories</h1>
                    <Link href="/categories/create">
                        <Button size="sm">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Category
                        </Button>
                    </Link>
                </div>
                
                <div className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs uppercase bg-muted dark:bg-gray-800 text-muted-foreground">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left">Description</th>
                                    <th scope="col" className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 ? (
                                    <tr className="border-b dark:border-gray-800">
                                        <td colSpan={3} className="px-6 py-4 text-center text-muted-foreground">No categories found</td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr key={category.id} className="border-b dark:border-gray-800 hover:bg-muted/50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 font-medium">
                                                <Link href={`/categories/${category.id}`} className="hover:underline text-foreground">
                                                    {category.name}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-foreground">{category.description || '-'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <Link href={`/categories/${category.id}/edit`}>
                                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="icon" 
                                                        className="h-8 w-8"
                                                        onClick={() => handleDelete(category.id)}
                                                        disabled={isDeleting}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
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
