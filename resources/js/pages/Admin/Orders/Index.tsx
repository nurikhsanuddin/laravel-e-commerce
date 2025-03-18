import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { format_rupiah } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';

interface OrderItem {
    id: number;
    product: {
        name: string;
    };
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    user: {
        name: string;
    };
    total_price: number;
    status: string;
    payment_status: string;
    payment_method: string;
    payment_proof: string | null;
    created_at: string;
    orderItems: OrderItem[];
}

interface Props {
    orders: {
        data: Order[];
        links: any; // Pagination links
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/admin/orders',
    },
];

export default function Index({ orders }: Props) {
    // Helper function to get appropriate badge color based on status
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'processing':
                return 'bg-blue-500';
            case 'out_for_delivery':
                return 'bg-purple-500';
            case 'delivered':
                return 'bg-green-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getPaymentStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'processing':
                return 'bg-blue-500';
            case 'paid':
                return 'bg-green-500';
            case 'failed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Orders" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-foreground text-2xl font-bold">Orders Management</h1>
                </div>

                <div className="bg-card text-card-foreground dark:bg-sidebar-background overflow-hidden rounded-xl shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted text-muted-foreground text-xs uppercase dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Order ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Customer
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Total
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Payment Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.length === 0 ? (
                                    <tr className="border-b dark:border-gray-800">
                                        <td colSpan={7} className="text-muted-foreground px-6 py-4 text-center">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="hover:bg-muted/50 border-b dark:border-gray-800 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 font-medium">#{order.id}</td>
                                            <td className="text-foreground px-6 py-4">{order.user.name}</td>
                                            <td className="text-foreground px-6 py-4">{format_rupiah(order.total_price)}</td>
                                            <td className="text-foreground px-6 py-4">
                                                <Badge className={`${getStatusBadgeColor(order.status)}`}>
                                                    {order.status.replace('_', ' ').toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="text-foreground px-6 py-4">
                                                <Badge className={`${getPaymentStatusBadgeColor(order.payment_status)}`}>
                                                    {order.payment_status.toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="text-foreground px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <Link href={`/admin/orders/${order.id}`}>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {orders.links && orders.links.length > 3 && (
                    <div className="mt-4 flex justify-center">
                        <nav className="flex items-center space-x-1">
                            {orders.links.map((link: any, i: number) => {
                                if (link.url === null)
                                    return (
                                        <span
                                            key={i}
                                            className="px-3 py-2 text-sm text-gray-500"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        ></span>
                                    );

                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`rounded-md px-3 py-2 text-sm ${link.active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    ></Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
