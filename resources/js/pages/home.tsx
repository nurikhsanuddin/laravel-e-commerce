import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { ChevronRight, Heart, Menu, Package, Search, ShoppingCart, Truck, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Import components
import CartDrawer from '@/components/CartDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
                quantity: 1,
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
            setWishlist(wishlist.filter((id) => id !== productId));
            toast.success('Removed from wishlist');
        } else {
            setWishlist([...wishlist, productId]);
            toast.success('Added to wishlist');
        }
    };

    const filterProducts = () => {
        let filtered = [...featuredProducts];

        if (searchQuery) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())),
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter((product) => product.category_id === selectedCategory);
        }

        setFilteredProducts(filtered);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        filterProducts();
    };

    const handleCategorySelect = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
    };

    return (
        <>
            <Head title="PT. Menara Galvalum" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-3 sm:py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo/Brand */}
                            <Link href={route('home')} className="text-primary flex-shrink-0 text-xl font-bold sm:text-2xl">
                                PT. Menara Galvalum
                            </Link>

                            {/* Search bar - Desktop */}
                            <div className="mx-4 hidden flex-1 items-center md:flex lg:mx-6">
                                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl">
                                    <Input
                                        type="text"
                                        placeholder="Search for products..."
                                        className="w-full pl-10"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                                    <Button type="submit" className="absolute top-0 right-0 rounded-l-none">
                                        Search
                                    </Button>
                                </form>
                            </div>

                            {/* Navigation - Desktop */}
                            <nav className="hidden items-center gap-4 md:flex lg:gap-6">
                                {auth.user ? (
                                    <>
                                        <Link href={route('orders.index')} className="hover:text-primary text-gray-700">
                                            My Orders
                                        </Link>
                                        {auth.user.role === 'admin' && (
                                            <Link href={route('dashboard')} className="hover:text-primary text-gray-700">
                                                Dashboard
                                            </Link>
                                        )}
                                        <div className="relative">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                                className="flex items-center gap-2"
                                            >
                                                <User className="h-5 w-5" />
                                                <span className="hidden sm:inline">{auth.user.name}</span>
                                            </Button>

                                            {isUserMenuOpen && (
                                                <div className="ring-opacity-5 absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                                                    <Link
                                                        href={route('logout')}
                                                        method="post"
                                                        as="button"
                                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="hover:text-primary text-gray-700">
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
                                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                                    {cartCount > 0 && <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5">{cartCount}</Badge>}
                                </Button>
                            </nav>

                            {/* Mobile menu button */}
                            <div className="flex items-center gap-1 sm:gap-2 md:hidden">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        fetchCart();
                                        setIsCartOpen(true);
                                    }}
                                    className="relative"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartCount > 0 && <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">{cartCount}</Badge>}
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div className="mt-3 md:hidden">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    className="h-9 w-full pl-9 text-sm"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                                <Search className="absolute top-2 left-2.5 h-4.5 w-4.5 text-gray-400" />
                                <Button type="submit" size="sm" className="absolute top-0 right-0 h-9 rounded-l-none">
                                    Search
                                </Button>
                            </form>
                        </div>

                        {/* Mobile Menu */}
                        {isMenuOpen && (
                            <div className="mt-3 border-t border-gray-200 py-2 md:hidden">
                                <nav className="flex flex-col">
                                    {auth.user ? (
                                        <>
                                            <Link href={route('orders.index')} className="hover:text-primary py-2 text-sm text-gray-700">
                                                My Orders
                                            </Link>
                                            {auth.user.role === 'admin' && (
                                                <Link href={route('dashboard')} className="hover:text-primary py-2 text-sm text-gray-700">
                                                    Dashboard
                                                </Link>
                                            )}
                                            <div className="flex items-center gap-2 py-2 text-sm">
                                                <User className="h-4 w-4" />
                                                <span>{auth.user.name}</span>
                                            </div>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="hover:text-primary py-2 text-sm text-gray-700"
                                            >
                                                Logout
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={route('login')} className="hover:text-primary py-2 text-sm text-gray-700">
                                                Login
                                            </Link>
                                            {/* <Link href={route('register')} className="py-2 text-sm">
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
                <section className="from-primary to-primary-dark bg-gradient-to-r py-10 text-white sm:py-12 md:py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl">PT. Menara Galvalum</h1>
                        <p className="mx-auto mb-6 max-w-2xl text-base sm:mb-8 sm:text-lg md:text-xl">
                            Selamat datang di PT. Menara Galvalum, penyedia material konstruksi berbasis galvalum yang berkualitas dan inovatif.
                            Temukan solusi terbaik untuk kebutuhan konstruksi Anda dengan produk unggulan kami yang kuat, tahan lama, dan ramah
                            lingkungan.{' '}
                        </p>
                        <Button size="lg" asChild className="text-primary bg-white hover:bg-gray-100">
                            <a href="#products">Pesan Sekarang</a>
                        </Button>
                    </div>
                </section>

                {/* Categories */}
                <section className="bg-white py-6 sm:py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">Kategori</h2>

                        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:gap-3 md:gap-4">
                            <Button
                                variant={selectedCategory === null ? 'default' : 'outline'}
                                onClick={() => handleCategorySelect(null)}
                                className="text-sm whitespace-nowrap"
                                size="sm"
                            >
                                Semua
                            </Button>

                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                                    onClick={() => handleCategorySelect(category.id)}
                                    className="text-sm whitespace-nowrap"
                                    size="sm"
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section id="products" className="py-6 sm:py-8 md:py-10">
                    <div className="container mx-auto px-3 sm:px-4">
                        <div className="mb-4 flex items-center justify-between sm:mb-6">
                            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Featured Products</h2>
                            {selectedCategory === null && (
                                <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                                    <Link href="#" className="flex items-center">
                                        View All <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-sm text-gray-500 sm:text-base">No products found. Try a different search.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                                {filteredProducts.map((product) => (
                                    <Card key={product.id} className="flex h-full flex-col overflow-hidden border-gray-200">
                                        <Link
                                            href={route('products.show', product.id)}
                                            className="group relative aspect-square overflow-hidden bg-gray-100"
                                        >
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                                    <span className="text-xs text-gray-400">No image</span>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 opacity-80 transition-opacity">
                                                <button
                                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 sm:h-7 sm:w-7"
                                                    aria-label="Add to wishlist"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent navigation when clicking the wishlist button
                                                        toggleWishlist(product.id);
                                                    }}
                                                >
                                                    <Heart
                                                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                                                            wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                            {product.stock <= 5 && product.stock > 0 && (
                                                <div className="absolute top-2 left-2">
                                                    <Badge variant="destructive" className="px-1 py-0.5 text-xs">
                                                        Sisa {product.stock}
                                                    </Badge>
                                                </div>
                                            )}
                                        </Link>
                                        <div className="flex flex-grow flex-col p-2 sm:p-3">
                                            <div className="mb-1">
                                                {product.category && <span className="text-xs text-gray-500">{product.category}</span>}
                                                <Link href={route('products.show', product.id)}>
                                                    <h3 className="hover:text-primary line-clamp-2 text-xs font-medium sm:text-sm">{product.name}</h3>
                                                </Link>
                                            </div>

                                            <p className="mb-2 line-clamp-2 text-xs text-gray-600 sm:mb-3">{product.description}</p>

                                            <div className="mt-auto flex flex-col gap-1">
                                                <span className="text-xs font-bold sm:text-sm md:text-base">
                                                    {format_rupiah(product.price).replace(',00', '')}
                                                </span>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent navigation when clicking the add to cart button
                                                        addToCart(product.id);
                                                    }}
                                                    disabled={product.stock <= 0}
                                                    variant={product.stock <= 0 ? 'outline' : 'default'}
                                                    size="sm"
                                                    className="h-7 w-full text-xs"
                                                >
                                                    {product.stock > 0 ? 'Masukkan Keranjang' : 'Out of Stock'}
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Product Features */}
                <section className="bg-white py-8 sm:py-10 md:py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-center text-xl font-semibold sm:mb-10 sm:text-2xl">Mengapa Memilih Kami?</h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-1">
                            <div className="text-center">
                                <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16">
                                    <Truck className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
                                </div>
                                <h3 className="mb-1 text-base font-semibold sm:mb-2 sm:text-lg">Pengiriman Cepat</h3>
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    Kami menyediakan layanan pengiriman cepat dan tepat waktu ke berbagai wilayah dengan jaminan keamanan produk.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16">
                                    <Package className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
                                </div>
                                <h3 className="mb-1 text-base font-semibold sm:mb-2 sm:text-lg">Kualitas Terjamin</h3>
                                <p className="text-xs text-gray-600 sm:text-sm">
                                    Produk kami dibuat dengan standar tinggi, menggunakan bahan berkualitas untuk memastikan ketahanan dan daya tahan
                                    terbaik.
                                </p>
                            </div>

                            {/* <div className="text-center sm:col-span-2 md:col-span-1"></div> */}

                            <div className="text-center">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <svg className="text-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">Transaksi Aman</h3>
                                <p className="text-gray-600">
                                    Kami menyediakan berbagai metode pembayaran yang aman dan terenkripsi untuk kenyamanan serta perlindungan
                                    pelanggan.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                {/* <section className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-center text-2xl font-semibold">What Our Customers Say</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                {
                                    name: 'Sarah Johnson',
                                    comment: 'The quality of the products exceeded my expectations. Fast shipping too!',
                                    rating: 5,
                                },
                                {
                                    name: 'Michael Chen',
                                    comment: 'Great customer service. They helped me find exactly what I needed and delivery was prompt.',
                                    rating: 5,
                                },
                                {
                                    name: 'Emily Rodriguez',
                                    comment: "I've been shopping here for months and have never been disappointed. Highly recommend!",
                                    rating: 4,
                                },
                            ].map((testimonial, index) => (
                                <Card key={index} className="p-6">
                                    <div className="mb-4 flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="mb-4 text-gray-600">"{testimonial.comment}"</p>
                                    <p className="font-medium">{testimonial.name}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Newsletter */}
                {/* <section className="bg-white py-12">
                    <div className="container mx-auto max-w-3xl px-4">
                        <div className="mb-6 text-center">
                            <h2 className="mb-2 text-2xl font-semibold">Subscribe to Our Newsletter</h2>
                            <p className="text-gray-600">Stay updated with our latest products and exclusive offers.</p>
                        </div>

                        <form className="flex flex-col gap-3 sm:flex-row">
                            <Input type="email" placeholder="Your email address" className="flex-grow" required />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </section> */}

                {/* Footer */}
                <footer className="bg-gray-800 py-12 text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div>
                                <h3 className="mb-4 text-xl font-semibold">PT. Menara Galvalum</h3>
                                <p className="text-gray-300">
                                    PT. Menara Galvalum adalah perusahaan yang bergerak di bidang produksi dan distribusi material galvalum untuk
                                    berbagai kebutuhan konstruksi. Dengan pengalaman dan inovasi yang terus berkembang, kami berkomitmen untuk
                                    menyediakan produk berkualitas tinggi yang sesuai dengan standar industri.{' '}
                                </p>
                            </div>
                            {/* <div>
                                <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white">
                                            FAQs
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white">
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                            <div>
                                <h4 className="mb-4 text-lg font-semibold">Hubungi Kami</h4>
                                <address className="text-gray-300 not-italic">
                                    <p>Jl. Adi Sucipto</p>
                                    <p>Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145</p>
                                    {/* <p className="mt-2">Email: info@PT. Menara Galvalum.com</p> */}
                                    <p>Telp : 0852-9006-0664</p>
                                </address>
                            </div>
                        </div>
                        {/* <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} PT. Menara Galvalum. All rights reserved.</p>
                        </div> */}
                    </div>
                </footer>

                {/* Cart Drawer */}
                <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} fetchCart={fetchCart} />
            </div>
        </>
    );
}
