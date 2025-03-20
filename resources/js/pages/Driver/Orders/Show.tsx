import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { format_rupiah } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    image: string | null;
}

interface Order {
    id: number;
    user: {
        name: string;
    };
    status: string;
    shipping_address: string;
    total_price: number;
    created_at: string;
    orderItems: OrderItem[]; // Changed from items to orderItems
}

interface Props {
    order: Order;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'My Orders', href: '/driver/orders' },
    { title: 'Order Details', href: '#' },
];

export default function Show({ order }: Props) {
    const { post, processing } = useForm();

    const handleMarkDelivered = () => {
        post(route('driver.orders.delivered', { id: order.id }), {
            onSuccess: () => {
                toast.success('Order marked as delivered');
            },
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order #${order.id}`} />

            <div className="p-4">
                <div className="mb-4">
                    <Button variant="outline" asChild>
                        <Link href={route('driver.orders.index')} className="flex items-center">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                                    <dd>#{order.id}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Customer</dt>
                                    <dd>{order.user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd>
                                        <Badge>{order.status}</Badge>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Alamat Pengiriman</dt>
                                    <dd className="whitespace-pre-wrap">{order.shipping_address}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                                    <dd>{format(new Date(order.created_at), 'PPP')}</dd>
                                </div>
                            </dl>

                            {order.status === 'driver_telah_ditugaskan' && (
                                <Button className="mt-6 w-full" onClick={handleMarkDelivered} disabled={processing}>
                                    Tandai Sudah Dikirim
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.orderItems.map(
                                    (
                                        item, // Changed from items to orderItems
                                    ) => (
                                        <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                                {item.image ? (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.product_name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
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
                                            <div className="text-right">
                                                <p className="font-medium">{format_rupiah(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ),
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Total</span>
                                        <span className="font-medium">{format_rupiah(order.total_price)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
