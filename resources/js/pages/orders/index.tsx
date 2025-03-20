import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronRight, Package } from 'lucide-react';

// Import components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format_rupiah } from '@/lib/utils';

interface OrderItem {
    id: number;
    product_name: string;
    price: number;
    quantity: number;
    image: string | null;
}

interface Order {
    id: number;
    status: string;
    payment_status: string;
    payment_method: string;
    total_price: number;
    created_at: string;
    items: OrderItem[];
}

interface OrdersIndexProps {
    orders: Order[];
}

export default function OrdersIndex({ orders }: OrdersIndexProps) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'menunggu':
                return 'bg-amber-100 text-amber-800';
            case 'diproses':
                return 'bg-blue-100 text-blue-800';
            case 'driver_telah_ditugaskan':
                return 'bg-purple-100 text-purple-800';
            case 'terkirim':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'terbayar':
                return 'bg-green-100 text-green-800';
            case 'menunggu':
                return 'bg-amber-100 text-amber-800';
            case 'gagal':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="My Orders" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Pesanan</h1>
                        <Button variant="outline" asChild>
                            <Link href={route('home')}>Lanjut Berbelanja</Link>
                        </Button>
                    </div>

                    {orders.length === 0 ? (
                        <Card className="flex flex-col items-center justify-center p-12 text-center">
                            <Package className="mb-4 h-16 w-16 text-gray-400" />
                            <h2 className="mb-2 text-xl font-semibold">No orders yet</h2>
                            <p className="mb-6 text-gray-500">You haven't placed any orders yet.</p>
                            <Button asChild>
                                <Link href={route('home')}>Start Shopping</Link>
                            </Button>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <Card key={order.id} className="overflow-hidden">
                                    <div className="border-b bg-gray-50 p-4 sm:p-6">
                                        <div className="flex flex-col justify-between gap-4 sm:flex-row">
                                            <div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>Order #{order.id}</span>
                                                    <span>•</span>
                                                    <span>{format(new Date(order.created_at), 'PPP')}</span>
                                                </div>
                                                <h3 className="mt-1 text-lg font-medium">
                                                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} for{' '}
                                                    {format_rupiah(order.total_price)}
                                                </h3>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>

                                                <Badge className={getPaymentStatusColor(order.payment_status)}>{order.payment_status}</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6">
                                        <div className="space-y-4">
                                            {/* Preview of first 2 items */}
                                            {order.items.slice(0, 2).map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-100">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.product_name}
                                                                className="h-full w-full rounded-md object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center">
                                                                <span className="text-gray-400">No image</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{item.product_name}</h4>
                                                        <p className="text-sm text-gray-500">
                                                            {item.quantity} x {format_rupiah(item.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Show indicator if there are more items */}
                                            {order.items.length > 2 && (
                                                <p className="text-sm text-gray-500">
                                                    + {order.items.length - 2} more {order.items.length - 2 === 1 ? 'item' : 'items'}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <Button asChild>
                                                <Link href={route('orders.show', order.id)}>
                                                    View Order Details
                                                    <ChevronRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
