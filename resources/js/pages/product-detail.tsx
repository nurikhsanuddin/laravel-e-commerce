import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import CartDrawer from '@/components/CartDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format_rupiah } from '@/lib/utils';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | null;
    category: string | null;
    category_id: number;
    weight: number;
    dimensions: string | null;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    productImages?: any; // Add the missing property
    auth: {
        user: { name: string; role: string } | null;
    };
}

export default function ProductDetail({ product, relatedProducts, productImages, auth }: Props) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        // Fetch cart on load
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get(route('cart.get'));
            const { cart } = response.data;
            setCartItems(Object.values(cart));
            setCartCount(Object.keys(cart).length);
        } catch (error) {
            console.error('Error fetching cart', error);
        }
    };

    const addToCart = async () => {
        if (quantity <= 0) {
            toast.error('Please select a valid quantity');
            return;
        }

        try {
            const response = await axios.post(route('cart.add'), {
                product_id: product.id,
                quantity: quantity,
            });

            setCartCount(response.data.cartCount);
            toast.success('Product added to cart!');

            // Reset quantity
            setQuantity(1);

            // Open the cart drawer after adding
            setIsCartOpen(true);
            fetchCart();
        } catch (error: any) {
            console.error('Error adding to cart', error);
            if (error.response && error.response.status === 422) {
                toast.error('Not enough stock available');
            } else {
                toast.error('Failed to add product to cart');
            }
        }
    };

    const toggleWishlist = () => {
        setIsInWishlist(!isInWishlist);
        toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    console.log('Product image:', productImages);
    return (
        <>
            <Head title={`${product.name} | PT. Menara Galvalum`} />

            <div className="min-h-screen bg-gray-50">
                {/* Header - Simplified for the product detail page */}
                <header className="sticky top-0 z-40 bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('home')} className="text-primary flex items-center text-xl font-bold">
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                PT. Menara Galvalum
                            </Link>

                            <Button
                                variant="ghost"
                                onClick={() => {
                                    fetchCart();
                                    setIsCartOpen(true);
                                }}
                                className="relative"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5">{cartCount}</Badge>}
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Product Detail */}
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            {/* Product Image */}
                            <div className="rounded-lg bg-white p-4 shadow-sm">
                                <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                                    {productImages ? (
                                        <img src={productImages} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                            <span className="text-gray-400">No image available</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    {product.category && typeof product.category === 'string' ? (
                                        <Badge variant="outline" className="font-normal">
                                            {product.category}
                                        </Badge>
                                    ) : null}
                                    {product.stock <= 5 && product.stock > 0 ? (
                                        <Badge variant="destructive">Sisa {product.stock}</Badge>
                                    ) : product.stock <= 0 ? (
                                        <Badge variant="destructive">Out of Stock</Badge>
                                    ) : null}
                                </div>

                                <h1 className="mb-2 text-2xl font-bold md:text-3xl">{product.name}</h1>
                                <p className="text-primary mb-4 text-2xl font-bold">{format_rupiah(product.price).replace(',00', '')}</p>

                                <div className="mb-6">
                                    <h3 className="mb-2 font-medium">Description</h3>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>

                                {/* Product Specifications */}
                                <div className="mb-6">
                                    <h3 className="mb-2 font-medium">Specifications</h3>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        <li className="flex justify-between">
                                            <span className="font-medium">Weight:</span>
                                            <span>{product.weight} kg</span>
                                        </li>
                                        {product.dimensions && (
                                            <li className="flex justify-between">
                                                <span className="font-medium">Dimensions:</span>
                                                <span>{product.dimensions}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Quantity Selector */}
                                <div className="mb-6">
                                    <h3 className="mb-2 font-medium">Quantity</h3>
                                    <div className="flex w-fit items-center rounded-md border">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={decreaseQuantity}
                                            disabled={quantity <= 1 || product.stock <= 0}
                                            className="h-10 px-3"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center">{quantity}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={increaseQuantity}
                                            disabled={quantity >= product.stock || product.stock <= 0}
                                            className="h-10 px-3"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button onClick={addToCart} disabled={product.stock <= 0} className="flex-grow" size="lg">
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={toggleWishlist}
                                        className={isInWishlist ? 'text-primary border-primary' : ''}
                                    >
                                        <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-primary' : ''}`} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="bg-white py-8">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-6 text-xl font-semibold">Related Products</h2>

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <Card key={relatedProduct.id} className="overflow-hidden">
                                        <Link href={route('products.show', relatedProduct.id)} className="block">
                                            <div className="aspect-square bg-gray-100">
                                                {relatedProduct.image ? (
                                                    <img
                                                        // get form storage
                                                        src={`/storage/${relatedProduct}` || relatedProduct.image}
                                                        alt={relatedProduct.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                                        <span className="text-xs text-gray-400">No image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="mb-1 line-clamp-1 text-sm font-medium">{relatedProduct.name}</h3>
                                                <p className="text-primary text-sm font-bold">
                                                    {format_rupiah(relatedProduct.price).replace(',00', '')}
                                                </p>
                                            </div>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-gray-800 py-8 text-white">
                    <div className="container mx-auto px-4">
                        <div className="mb-4 text-center">
                            <h3 className="text-xl font-semibold">PT. Menara Galvalum</h3>
                            <p className="text-sm text-gray-300">Jl. Adi Sucipto, Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145</p>
                            <p className="text-sm text-gray-300">Telp: 0852-9006-0664</p>
                        </div>
                    </div>
                </footer>

                {/* Cart Drawer */}
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} fetchCart={fetchCart} />
            </div>
        </>
    );
}
