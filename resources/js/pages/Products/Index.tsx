import { Button } from '@/components/ui/button';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    products: {
        data: Product[];
        links: any; // Pagination links
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Index({ products }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setIsDeleting(true);
            router.delete(`/products/${id}`, {
                onFinish: () => setIsDeleting(false),
            });
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-foreground text-2xl font-bold">Products</h1>
                    <Link href="/products/create">
                        <Button size="sm">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <div className="bg-card text-card-foreground dark:bg-sidebar-background overflow-hidden rounded-xl shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted text-muted-foreground text-xs uppercase dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Stock
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.length === 0 ? (
                                    <tr className="border-b dark:border-gray-800">
                                        <td colSpan={5} className="text-muted-foreground px-6 py-4 text-center">
                                            No products found
                                        </td>
                                    </tr>
                                ) : (
                                    products.data.map((product) => (
                                        <tr key={product.id} className="hover:bg-muted/50 border-b dark:border-gray-800 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 font-medium">
                                                <Link href={`/products/${product.id}`} className="text-foreground hover:underline">
                                                    {product.name}
                                                </Link>
                                            </td>
                                            <td className="text-foreground px-6 py-4">
                                                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                            </td>
                                            <td className="text-foreground px-6 py-4">{product.stock}</td>
                                            <td className="text-foreground px-6 py-4">{product.category.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <Link href={`/products/${product.id}`}>
                                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/products/${product.id}/edit`}>
                                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => handleDelete(product.id)}
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

                {/* Pagination will be handled by the Laravel pagination system that's already integrated */}
                {products.links && products.links.length > 3 && (
                    <div className="mt-4 flex justify-center">
                        <nav className="flex items-center space-x-1">
                            {products.links.map((link: any, i: number) => {
                                if (link.url === null)
                                    return (
                                        <span
                                            key={i}
                                            className="px-3 py-2 text-sm text-gray-500"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        ></span>
                                    );

                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`rounded-md px-3 py-2 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
