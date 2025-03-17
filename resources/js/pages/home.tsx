import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Search, Menu, X, User, Heart, ChevronRight, TrendingUp, Star, Package, Truck } from 'lucide-react';

// Import components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CartDrawer from '@/components/CartDrawer';
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

interface Category {
    id: number;
    name: string;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    auth: {
        user: { name: string; role: string } | null;
    };
}

export default function Home({ featuredProducts, categories, auth }: Props) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(featuredProducts);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [wishlist, setWishlist] = useState<number[]>([]);

    useEffect(() => {
        // Fetch cart count on page load
        fetchCart();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, selectedCategory, featuredProducts]);

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

    const addToCart = async (productId: number) => {
        try {
            const response = await axios.post(route('cart.add'), {
                product_id: productId,
                quantity: 1
            });
            
            setCartCount(response.data.cartCount);
            toast.success('Product added to cart!');
            
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

    const toggleWishlist = (productId: number) => {
        if (wishlist.includes(productId)) {
            setWishlist(wishlist.filter(id => id !== productId));
            toast.success('Removed from wishlist');
        } else {
            setWishlist([...wishlist, productId]);
            toast.success('Added to wishlist');
        }
    };

    const filterProducts = () => {
        let filtered = [...featuredProducts];
        
        if (searchQuery) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category_id === selectedCategory);
        }
        
        setFilteredProducts(filtered);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategorySelect = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

    return (
        <>
            <Head title="ShopExpress - Online Shopping" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-40">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo/Brand */}
                            <Link href={route('home')} className="text-2xl font-bold text-primary">
                                ShopExpress
                            </Link>
                            
                            {/* Search bar - Desktop */}
                            <div className="hidden md:flex items-center flex-1 mx-6">
                                <div className="relative w-full max-w-xl">
                                    <Input 
                                        type="text" 
                                        placeholder="Search for products..." 
                                        className="pl-10 w-full" 
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            
                            {/* Navigation - Desktop */}
                            <nav className="hidden md:flex items-center gap-6">
                                {auth.user ? (
                                    <>
                                        <Link href={route('orders.index')} className="text-gray-700 hover:text-primary">
                                            My Orders
                                        </Link>
                                        {auth.user.role === 'admin' && (
                                            <Link href={route('dashboard')} className="text-gray-700 hover:text-primary">
                                                Dashboard
                                            </Link>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            <span>{auth.user.name}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-700 hover:text-primary">
                                            Login
                                        </Link>
                                        {/* <Link href={route('register')}>
                                            <Button size="sm">Register</Button>
                                        </Link> */}
                                    </>
                                )}
                                
                                {/* Cart Button */}
                                <Button 
                                    variant="ghost" 
                                    onClick={() => {
                                        fetchCart();
                                        setIsCartOpen(true);
                                    }}
                                    className="relative"
                                >
                                    <ShoppingCart className="h-6 w-6" />
                                    {cartCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                            </nav>
                            
                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden gap-2">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => {
                                        fetchCart();
                                        setIsCartOpen(true);
                                    }}
                                    className="relative"
                                >
                                    <ShoppingCart className="h-6 w-6" />
                                    {cartCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Button>
                                <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        
                        {/* Mobile Search */}
                        <div className="mt-4 md:hidden">
                            <div className="relative">
                                <Input 
                                    type="text" 
                                    placeholder="Search for products..." 
                                    className="pl-10 w-full" 
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        
                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="mt-4 md:hidden py-2 border-t border-gray-200">
                                <nav className="flex flex-col gap-2">
                                    {auth.user ? (
                                        <>
                                            <Link href={route('orders.index')} className="text-gray-700 hover:text-primary py-2">
                                                My Orders
                                            </Link>
                                            {auth.user.role === 'admin' && (
                                                <Link href={route('dashboard')} className="text-gray-700 hover:text-primary py-2">
                                                    Dashboard
                                                </Link>
                                            )}
                                            <div className="flex items-center gap-2 py-2">
                                                <User className="h-5 w-5" />
                                                <span>{auth.user.name}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={route('login')} className="text-gray-700 hover:text-primary py-2">
                                                Login
                                            </Link>
                                            {/* <Link href={route('register')} className="py-2">
                                                Register
                                            </Link> */}
                                        </>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>
                </header>
                
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to ShopExpress</h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                            Discover amazing products with fast delivery and great customer service.
                        </p>
                        <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                            <a href="#products">Shop Now</a>
                        </Button>
                    </div>
                </section>
                
                {/* Categories */}
                <section className="py-8 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
                        
                        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                            <Button 
                                variant={selectedCategory === null ? "default" : "outline"}
                                onClick={() => handleCategorySelect(null)}
                                className="whitespace-nowrap"
                            >
                                All Categories
                            </Button>
                            
                            {categories.map(category => (
                                <Button 
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    onClick={() => handleCategorySelect(category.id)}
                                    className="whitespace-nowrap"
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Featured Products */}
                <section id="products" className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-semibold">Featured Products</h2>
                            {selectedCategory === null && (
                                <Button variant="outline" asChild>
                                    <Link href="#" className="flex items-center">
                                        View All <ChevronRight className="h-4 w-4 ml-1"/>
                                    </Link>
                                </Button>
                            )}
                        </div>
                        
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <Card key={product.id} className="overflow-hidden flex flex-col h-full">
                                        <div className="aspect-square overflow-hidden bg-gray-100 relative group">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                    <span className="text-gray-400">No image</span>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    className="h-8 w-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
                                                    aria-label="Add to wishlist"
                                                    onClick={() => toggleWishlist(product.id)}
                                                >
                                                    <Heart 
                                                        className={`h-4 w-4 ${wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                                                    />
                                                </button>
                                            </div>
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute top-2 left-2">
                                                    <Badge variant="destructive">Only {product.stock} left</Badge>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <div className="mb-2">
                                                {product.category && (
                                                    <span className="text-xs text-gray-500">{product.category}</span>
                                                )}
                                                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                                            </div>
                                            
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                            
                                            <div className="mt-auto flex items-center justify-between">
                                                <span className="text-lg font-bold">{format_rupiah(product.price)}</span>
                                                <Button 
                                                    onClick={() => addToCart(product.id)}
                                                    disabled={product.stock <= 0}
                                                    variant={product.stock <= 0 ? "outline" : "default"}
                                                >
                                                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                
                {/* Special Offers Banner */}
                <section className="py-8 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/25 rounded-lg p-6 md:p-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Special Summer Sale!</h2>
                                    <p className="text-lg mb-6">Get up to 40% off on selected items. Limited time offer.</p>
                                    <Button size="lg">Shop the Sale</Button>
                                </div>
                                <div className="hidden md:flex justify-end">
                                    <div className="bg-white p-4 rounded-lg rotate-3 shadow-lg">
                                        <div className="text-4xl font-bold text-primary">40% OFF</div>
                                        <div className="text-sm">Use code: SUMMER2023</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Product Features */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-semibold mb-10 text-center">Why Shop With Us</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full h-16 w-16 mx-auto flex items-center justify-center mb-4">
                                    <Truck className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                                <p className="text-gray-600">Free shipping on orders over $50. Same-day delivery available in select areas.</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full h-16 w-16 mx-auto flex items-center justify-center mb-4">
                                    <Package className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                                <p className="text-gray-600">All products are carefully selected to ensure the highest quality standards.</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full h-16 w-16 mx-auto flex items-center justify-center mb-4">
                                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
                                <p className="text-gray-600">Multiple secure payment options and encrypted transactions for your peace of mind.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonials */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-semibold mb-8 text-center">What Our Customers Say</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    name: "Sarah Johnson",
                                    comment: "The quality of the products exceeded my expectations. Fast shipping too!",
                                    rating: 5
                                },
                                {
                                    name: "Michael Chen",
                                    comment: "Great customer service. They helped me find exactly what I needed and delivery was prompt.",
                                    rating: 5
                                },
                                {
                                    name: "Emily Rodriguez",
                                    comment: "I've been shopping here for months and have never been disappointed. Highly recommend!",
                                    rating: 4
                                }
                            ].map((testimonial, index) => (
                                <Card key={index} className="p-6">
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                                    <p className="font-medium">{testimonial.name}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Newsletter */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
                            <p className="text-gray-600">Stay updated with our latest products and exclusive offers.</p>
                        </div>
                        
                        <form className="flex flex-col sm:flex-row gap-3">
                            <Input 
                                type="email" 
                                placeholder="Your email address" 
                                className="flex-grow" 
                                required
                            />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="bg-gray-800 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">ShopExpress</h3>
                                <p className="text-gray-300">
                                    Your one-stop shop for all your shopping needs. Fast delivery, 
                                    secure payments, and excellent customer service.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                                <address className="text-gray-300 not-italic">
                                    <p>123 Shop Street</p>
                                    <p>Jakarta, Indonesia</p>
                                    <p className="mt-2">Email: info@shopexpress.com</p>
                                    <p>Phone: (123) 456-7890</p>
                                </address>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} ShopExpress. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
                
                {/* Cart Drawer */}
                <CartDrawer
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    items={cartItems}
                    fetchCart={fetchCart}
                />
            </div>
        </>
    );
}
