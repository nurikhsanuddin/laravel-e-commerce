import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image?: string;
}

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    category: Category;
    products: Product[];
}

export default function Show({ category, products }: Props) {
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
            title: category.name,
            href: `/categories/${category.id}`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Category: ${category.name}`} />
            
            <div className="flex flex-col gap-6 p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/categories">
                            <Button variant="outline" size="icon">
                                <ArrowLeftIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
                    </div>
                    <Link href={`/categories/${category.id}/edit`}>
                        <Button variant="outline" size="sm">
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                </div>
                
                <div className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-2 text-foreground">Details</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Name</p>
                            <p className="text-foreground">{category.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="text-foreground">{category.description || 'No description'}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">Products in this category</h2>
                    
                    {products.length === 0 ? (
                        <p className="text-muted-foreground">No products in this category</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="border dark:border-gray-800 rounded-lg p-4 bg-background dark:bg-sidebar-background/70">
                                    <h3 className="font-medium text-foreground">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}
