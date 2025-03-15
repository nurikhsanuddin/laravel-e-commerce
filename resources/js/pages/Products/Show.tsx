import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: {
        id: number;
        name: string;
    };
    image: string | null;
    weight: number | null;
    dimensions: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    product: Product;
}

export default function Show({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: product.name,
            href: `/products/${product.id}`,
        },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Product: ${product.name}`} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-foreground text-2xl font-bold">{product.name}</h1>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/products">
                                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={`/products/${product.id}/edit`}>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Name</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Price</TableCell>
                                        <TableCell>${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Stock</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Category</TableCell>
                                        <TableCell>{product.category.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Weight</TableCell>
                                        <TableCell>{product.weight ? `${product.weight} kg` : 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Dimensions</TableCell>
                                        <TableCell>{product.dimensions || 'N/A'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Created</TableCell>
                                        <TableCell>{new Date(product.created_at).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Last Updated</TableCell>
                                        <TableCell>{new Date(product.updated_at).toLocaleString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Image</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                {product.image ? (
                                    <img src={`/storage/${product.image}`} alt={product.name} className="max-h-72 rounded-md object-contain" />
                                ) : (
                                    <div className="flex h-48 w-48 items-center justify-center rounded-md bg-gray-100 text-gray-400">No Image</div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap">{product.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
