import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from '@inertiajs/react';

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
                quantity: newQuantity
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
                product_id: productId
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
        <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <h2 className="text-lg font-semibold">Shopping Cart</h2>
                        <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-100">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center">
                                <p className="text-gray-500">Your cart is empty</p>
                                <Button className="mt-4" onClick={onClose}>
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex gap-4 rounded-lg border p-3">
                                        {/* Product Image */}
                                        <div className="h-20 w-20 flex-shrink-0 rounded-md bg-gray-100">
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="h-full w-full object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="text-gray-400">No image</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Product Details */}
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500"
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-sm text-gray-500">{format_rupiah(item.price)}</span>
                                            
                                            {/* Quantity Controls */}
                                            <div className="mt-auto flex items-center gap-2">
                                                <button 
                                                    className="rounded-full border p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || isLoading}
                                                >
                                                    <Minus className="h-3.5 w-3.5" />
                                                </button>
                                                <span className="min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    className="rounded-full border p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={isLoading}
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                                
                                                <div className="ml-auto text-right">
                                                    <span className="font-medium">
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
                        <div className="border-t p-4 space-y-3">
                            <div className="flex justify-between font-medium">
                                <span>Subtotal</span>
                                <span>{format_rupiah(calculateTotal())}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                Shipping and taxes will be calculated at checkout
                            </p>
                            <div className="grid gap-2">
                                <Button asChild className="w-full">
                                    <Link href={route('checkout.index')}>
                                        Checkout
                                    </Link>
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
