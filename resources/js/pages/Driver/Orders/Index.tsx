import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Orders',
        href: '/driver/orders',
    },
];

interface Props {
    orders: {
        data: Array<{
            id: number;
            user: { name: string };
            total_price: number;
            status: string;
            created_at: string;
            shipping_address: string;
        }>;
    };
}

export default function Index({ orders }: Props) {
    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders" />

            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>My Assigned Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left">Order ID</th>
                                        <th className="px-4 py-2 text-left">Customer</th>
                                        <th className="px-4 py-2 text-left">Address</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data.map((order) => (
                                        <tr key={order.id} className="border-b">
                                            <td className="px-4 py-2">#{order.id}</td>
                                            <td className="px-4 py-2">{order.user.name}</td>
                                            <td className="px-4 py-2">{order.shipping_address}</td>
                                            <td className="px-4 py-2">
                                                <Badge variant={order.status === 'driver_telah_ditugaskan' ? 'warning' : 'default'}>
                                                    {order.status === 'driver_telah_ditugaskan' ? 'Pengiriman Baru' : 'Terkirim'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-2">
                                                <Link href={`/driver/orders/${order.id}`}>
                                                    <EyeIcon className="h-5 w-5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
