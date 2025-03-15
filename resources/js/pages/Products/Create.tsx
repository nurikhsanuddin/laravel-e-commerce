import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
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
        title: 'Products',
        href: '/products',
    },
    {
        title: 'Create',
        href: '/products/create',
    },
];

export default function Create({ categories }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, errors, post, processing } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: null as File | null,
        weight: '',
        dimensions: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-foreground text-2xl font-bold">Create New Product</h1>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/products">
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Product Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={errors.name ? 'border-destructive' : ''}
                                        />
                                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className={errors.price ? 'border-destructive' : ''}
                                        />
                                        {errors.price && <p className="text-destructive text-sm">{errors.price}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={data.stock}
                                            onChange={(e) => setData('stock', e.target.value)}
                                            className={errors.stock ? 'border-destructive' : ''}
                                        />
                                        {errors.stock && <p className="text-destructive text-sm">{errors.stock}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category_id">Category</Label>
                                        <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                            <SelectTrigger className={errors.category_id ? 'border-destructive' : ''}>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={String(category.id)}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category_id && <p className="text-destructive text-sm">{errors.category_id}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={4}
                                            className={errors.description ? 'border-destructive' : ''}
                                        />
                                        {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <Input
                                            id="weight"
                                            type="number"
                                            step="0.01"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            className={errors.weight ? 'border-destructive' : ''}
                                        />
                                        {errors.weight && <p className="text-destructive text-sm">{errors.weight}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                                        <Input
                                            id="dimensions"
                                            value={data.dimensions}
                                            onChange={(e) => setData('dimensions', e.target.value)}
                                            placeholder="e.g. 10 x 5 x 3 cm"
                                            className={errors.dimensions ? 'border-destructive' : ''}
                                        />
                                        {errors.dimensions && <p className="text-destructive text-sm">{errors.dimensions}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Product Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={errors.image ? 'border-destructive' : ''}
                                />
                                {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}

                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" className="h-32 w-32 rounded-md object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Create Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
