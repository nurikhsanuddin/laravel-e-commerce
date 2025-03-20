import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { format_rupiah } from '@/lib/utils';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
}

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    fetchCart: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, fetchCart }: CartDrawerProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCartItems(items);
    }, [items]);

    const updateQuantity = async (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setIsLoading(true);
        try {
            await axios.post(route('cart.update'), {
                product_id: productId,
                quantity: newQuantity,
            });

            fetchCart();
            toast.success('Cart updated');
        } catch (error) {
            console.error('Error updating cart', error);
            toast.error('Failed to update cart');
        } finally {
            setIsLoading(false);
        }
    };

    const removeItem = async (productId: number) => {
        setIsLoading(true);
        try {
            await axios.post(route('cart.remove'), {
                product_id: productId,
            });

            fetchCart();
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing from cart', error);
            toast.error('Failed to remove item');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            <div
                className={`bg-background fixed top-0 right-0 h-full w-full max-w-md shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">Keranjang</h2>
                        <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-100">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-2 sm:p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center">
                                <p className="text-gray-500">Your cart is empty</p>
                                <Button className="mt-4" onClick={onClose}>
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex flex-col gap-2 rounded-lg border p-2 sm:flex-row sm:gap-4 sm:p-3">
                                        {/* Product Image */}
                                        <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-100 sm:h-20 sm:w-20">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="h-full w-full rounded-md object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="text-xs text-gray-400 sm:text-sm">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="line-clamp-2 text-sm font-medium sm:text-base">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="ml-2 text-gray-400 hover:text-red-500"
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-xs text-gray-500 sm:text-sm">{format_rupiah(item.price)}</span>

                                            {/* Quantity Controls */}
                                            <div className="mt-2 flex items-center gap-2 sm:mt-auto">
                                                <button
                                                    className="rounded-full border p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || isLoading}
                                                >
                                                    <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                </button>
                                                <span className="min-w-[1.5rem] text-center text-sm sm:min-w-[2rem]">{item.quantity}</span>
                                                <button
                                                    className="rounded-full border p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={isLoading}
                                                >
                                                    <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                                </button>

                                                <div className="ml-auto text-right">
                                                    <span className="text-sm font-medium sm:text-base">
                                                        {format_rupiah(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer with totals and checkout button */}
                    {cartItems.length > 0 && (
                        <div className="space-y-3 border-t p-4">
                            <div className="flex justify-between font-medium">
                                <span>Subtotal</span>
                                <span>{format_rupiah(calculateTotal())}</span>
                            </div>
                            {/* <p className="text-xs text-gray-500">
                                Shipping and taxes will be calculated at checkout
                            </p> */}
                            <div className="grid gap-2">
                                <Button asChild className="w-full">
                                    <Link href={route('checkout.index')}>Checkout</Link>
                                </Button>
                                <Button variant="outline" onClick={onClose}>
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
