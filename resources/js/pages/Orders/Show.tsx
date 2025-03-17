import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Truck, Package, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

// Import components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format_rupiah } from '@/lib/utils';

interface OrderItem {
    id: number;
    product_name: string;
    price: number;
    quantity: number;
    image: string | null;
}

interface TrackingUpdate {
    status: string;
    description: string;
    created_at: string;
}

interface Order {
    id: number;
    status: string;
    payment_status: string;
    payment_method: string;
    shipping_address: string;
    shipping_cost: number;
    total_price: number;
    created_at: string;
    items: OrderItem[];
    tracking: TrackingUpdate[];
}

interface OrderShowProps {
    order: Order;
}

export default function OrderShow({ order }: OrderShowProps) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-amber-100 text-amber-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-amber-100 text-amber-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'credit_card':
                return 'Credit Card';
            case 'bank_transfer':
                return 'Bank Transfer';
            case 'cash_on_delivery':
                return 'Cash on Delivery';
            default:
                return method;
        }
    };

    const subtotal = order.total_price - order.shipping_cost;
    
    return (
        <>
            <Head title={`Order #${order.id}`} />
            
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <Button variant="outline" asChild>
                            <Link href={route('orders.index')}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to My Orders
                            </Link>
                        </Button>
                    </div>
                    
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
                            <p className="text-gray-500">
                                Placed on {format(new Date(order.created_at), 'PPP')}
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge className={getStatusColor(order.status)}>
                                Order: {order.status}
                            </Badge>
                            <Badge className={getPaymentStatusColor(order.payment_status)}>
                                Payment: {order.payment_status}
                            </Badge>
                        </div>
                    </div>
                    
                    <div className="grid gap-8 lg:grid-cols-12">
                        {/* Order Details */}
                        <div className="lg:col-span-8">
                            <Card className="mb-8">
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Order Items</h2>
                                </div>
                                
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex border-b pb-6 last:border-0 last:pb-0">
                                                <div className="h-20 w-20 flex-shrink-0 rounded-md bg-gray-100">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.product_name}
                                                            className="h-full w-full object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-medium">{item.product_name}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            Price: {format_rupiah(item.price)}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex items-end justify-between">
                                                        <p className="text-sm text-gray-500">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                        <p className="font-medium">
                                                            {format_rupiah(item.price * item.quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                            
                            <Card>
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Order Tracking</h2>
                                </div>
                                
                                <div className="p-6">
                                    <div className="relative">
                                        <div className="absolute left-4 top-0 h-full w-px bg-gray-200"></div>
                                        
                                        <div className="space-y-8">
                                            {order.tracking.map((track, index) => (
                                                <div key={index} className="relative pl-10">
                                                    <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                                                        {index === 0 ? (
                                                            <CheckCircle className="h-5 w-5" />
                                                        ) : index === 1 ? (
                                                            <Package className="h-5 w-5" />
                                                        ) : (
                                                            <Truck className="h-5 w-5" />
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <h3 className="font-medium">{track.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h3>
                                                        <p className="text-gray-500">{track.description}</p>
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {format(new Date(track.created_at), 'PPP p')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        {/* Summary and Details */}
                        <div className="lg:col-span-4">
                            <Card className="mb-6">
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Order Summary</h2>
                                </div>
                                
                                <div className="p-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{format_rupiah(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>{format_rupiah(order.shipping_cost)}</span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2 font-medium">
                                            <span>Total</span>
                                            <span>{format_rupiah(order.total_price)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            
                            <Card>
                                <div className="border-b p-6">
                                    <h2 className="text-xl font-semibold">Order Information</h2>
                                </div>
                                
                                <div className="p-6">
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm text-gray-500">Payment Method</dt>
                                            <dd>{getPaymentMethodLabel(order.payment_method)}</dd>
                                        </div>
                                        
                                        <div>
                                            <dt className="text-sm text-gray-500">Shipping Address</dt>
                                            <dd className="whitespace-pre-wrap">{order.shipping_address}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
