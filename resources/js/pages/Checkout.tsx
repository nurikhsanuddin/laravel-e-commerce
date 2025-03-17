import { Head, useForm } from '@inertiajs/react';
import { ShoppingBag, CreditCard, Truck, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Import components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { format_rupiah } from '@/lib/utils';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string | null;
}

interface CheckoutProps {
    cart: Record<string, CartItem>;
    subtotal: number;
    shipping_cost: number;
    total: number;
}

export default function Checkout({ cart, subtotal, shipping_cost, total }: CheckoutProps) {
    const cartItems = Object.values(cart);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        shipping_address: '',
        payment_method: 'credit_card',
    });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        post(route('checkout.process'), {
            onSuccess: () => {
                toast.success('Order placed successfully!');
                setIsProcessing(false);
            },
            onError: () => {
                toast.error('There was an error processing your order.');
                setIsProcessing(false);
            }
        });
    };
    
    return (
        <>
            <Head title="Checkout" />
            
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Button variant="outline" asChild>
                            <a href={route('home')}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Shopping
                            </a>
                        </Button>
                    </div>
                    
                    <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
                    
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Checkout Form */}
                        <div className="lg:col-span-7">
                            <Card className="overflow-hidden">
                                <div className="border-b p-6">
                                    <h2 className="flex items-center text-lg font-semibold">
                                        <Truck className="mr-2 h-5 w-5" />
                                        Shipping Information
                                    </h2>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="shipping_address">Shipping Address</Label>
                                        <Textarea
                                            id="shipping_address"
                                            value={data.shipping_address}
                                            onChange={(e) => setData('shipping_address', e.target.value)}
                                            placeholder="Enter your full address"
                                            required
                                            rows={4}
                                            className={errors.shipping_address ? 'border-red-500' : ''}
                                        />
                                        {errors.shipping_address && (
                                            <p className="text-sm text-red-500">{errors.shipping_address}</p>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <Label>Payment Method</Label>
                                        <RadioGroup
                                            value={data.payment_method}
                                            onValueChange={(value) => setData('payment_method', value)}
                                            className="space-y-3"
                                        >
                                            <div className="flex items-center space-x-3 rounded-md border p-3">
                                                <RadioGroupItem value="credit_card" id="credit_card" />
                                                <Label htmlFor="credit_card" className="flex items-center">
                                                    <CreditCard className="mr-2 h-4 w-4" />
                                                    Credit Card
                                                </Label>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3 rounded-md border p-3">
                                                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                                                <Label htmlFor="bank_transfer">Bank Transfer</Label>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3 rounded-md border p-3">
                                                <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                                                <Label htmlFor="cash_on_delivery">Cash on Delivery</Label>
                                            </div>
                                        </RadioGroup>
                                        {errors.payment_method && (
                                            <p className="text-sm text-red-500">{errors.payment_method}</p>
                                        )}
                                    </div>
                                    
                                    <Button 
                                        type="submit" 
                                        className="w-full" 
                                        disabled={processing || isProcessing}
                                    >
                                        {(processing || isProcessing) ? 'Processing...' : 'Place Order'}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                        
                        {/* Order Summary */}
                        <div className="lg:col-span-5">
                            <Card>
                                <div className="border-b p-6">
                                    <h2 className="flex items-center text-lg font-semibold">
                                        <ShoppingBag className="mr-2 h-5 w-5" />
                                        Order Summary
                                    </h2>
                                </div>
                                
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-100">
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
                                                <div className="flex-1">
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span>{item.quantity} x {format_rupiah(item.price)}</span>
                                                        <span>{format_rupiah(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6 space-y-2 border-t pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>{format_rupiah(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Shipping</span>
                                            <span>{format_rupiah(shipping_cost)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 font-medium">
                                            <span>Total</span>
                                            <span>{format_rupiah(total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
