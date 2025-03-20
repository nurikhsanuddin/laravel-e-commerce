import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { format_rupiah } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface OrderItem {
    id: number;
    product: {
        name: string;
        id: number;
    };
    quantity: number;
    price: number;
}

interface OrderTracking {
    id: number;
    status: string;
    description: string;
    created_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Order {
    id: number;
    user: User;
    driver: User | null;
    total_price: number;
    status: string;
    payment_status: string;
    payment_method: string;
    payment_proof: string | null;
    shipping_address: string;
    shipping_cost: number;
    created_at: string;
    updated_at: string;
    order_items: OrderItem[]; // Changed from orderItems to order_items to match Laravel's snake_case
    tracking: OrderTracking[];
}

interface Props {
    order: Order;
    availableDrivers: User[];
}

export default function Show({ order, availableDrivers }: Props) {
    const [isVerifying, setIsVerifying] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Orders',
            href: '/admin/orders',
        },
        {
            title: `Order #${order.id}`,
            href: `/admin/orders/${order.id}`,
        },
    ];

    // Helper function to get appropriate badge color based on status
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'menunggu':
                return 'bg-yellow-500';
            case 'diproses':
                return 'bg-blue-500';
            case 'driver_telah_ditugaskan':
                return 'bg-purple-500';
            case 'terkirim':
                return 'bg-green-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getPaymentStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'menunggu':
                return 'bg-yellow-500';
            case 'diproses':
                return 'bg-blue-500';
            case 'terbayar':
                return 'bg-green-500';
            case 'gagal':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const handleVerifyPayment = () => {
        if (confirm('Are you sure you want to verify this payment?')) {
            setIsVerifying(true);

            router.post(
                `/admin/orders/${order.id}/verify-payment`,
                {},
                {
                    onSuccess: () => {
                        toast.success('Payment has been verified successfully');
                        setIsVerifying(false);
                    },
                    onError: () => {
                        toast.error('Failed to verify payment');
                        setIsVerifying(false);
                    },
                },
            );
        }
    };

    const handleRejectPayment = () => {
        const reason = prompt('Please enter the reason for rejection:');
        if (reason) {
            setIsRejecting(true);

            router.post(
                `/admin/orders/${order.id}/reject-order`,
                { rejection_reason: reason },
                {
                    onSuccess: () => {
                        toast.success('Payment has been rejected');
                        setIsRejecting(false);
                    },
                    onError: () => {
                        toast.error('Failed to reject payment');
                        setIsRejecting(false);
                    },
                },
            );
        }
    };

    const handleAssignDriver = (driverId: string) => {
        if (confirm('Are you sure you want to assign this driver?')) {
            router.post(
                `/admin/orders/${order.id}/assign-driver`,
                { driver_id: driverId },
                {
                    onSuccess: () => {
                        toast.success('Driver assigned successfully');
                    },
                    onError: () => {
                        toast.error('Failed to assign driver');
                    },
                },
            );
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order #${order.id}`} />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-foreground text-2xl font-bold">Order #{order.id}</h1>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/orders">
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Order Summary */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge className={`${getStatusBadgeColor(order.status)}`}>{order.status.replace('_', ' ').toUpperCase()}</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Status:</span>
                                <Badge className={`${getPaymentStatusBadgeColor(order.payment_status)}`}>{order.payment_status.toUpperCase()}</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment Method:</span>
                                <span>{order.payment_method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Date:</span>
                                <span>{new Date(order.created_at).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Update:</span>
                                <span>{new Date(order.updated_at).toLocaleString()}</span>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal:</span>
                                    <span>{format_rupiah(order.total_price - order.shipping_cost)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping:</span>
                                    <span>{format_rupiah(order.shipping_cost)}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>{format_rupiah(order.total_price)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer & Shipping Information */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-medium">Customer Details</h3>
                                <p>{order.user.name}</p>
                                <p>{order.user.email}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Shipping Address</h3>
                                <p className="whitespace-pre-wrap">{order.shipping_address}</p>
                            </div>
                            {order.driver && (
                                <div>
                                    <h3 className="font-medium">Driver</h3>
                                    <p>{order.driver.name}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Payment Proof & Verification */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Payment Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.payment_proof ? (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="text-center">
                                        <h3 className="font-medium">Payment Proof</h3>
                                        <p className="text-muted-foreground text-sm">Click to view full image</p>
                                    </div>
                                    <a href={`/storage/${order.payment_proof}`} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={`/storage/${order.payment_proof}`}
                                            alt="Payment Proof"
                                            className="h-48 w-auto max-w-full rounded-md border object-contain"
                                        />
                                    </a>

                                    {order.payment_status === 'diproses' && (
                                        <div className="flex w-full space-x-2">
                                            <Button onClick={handleVerifyPayment} disabled={isVerifying || isRejecting} className="flex-1">
                                                <CheckCircleIcon className="mr-2 h-4 w-4" />
                                                {isVerifying ? 'Verifying...' : 'Verify Payment'}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={handleRejectPayment}
                                                disabled={isVerifying || isRejecting}
                                                className="flex-1"
                                            >
                                                <XCircleIcon className="mr-2 h-4 w-4" />
                                                {isRejecting ? 'Rejecting...' : 'Reject'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-2 rounded-md border border-dashed p-8 text-center">
                                    <p className="text-muted-foreground">No payment proof uploaded yet</p>
                                </div>
                            )}
                            {order.payment_status === 'terbayar' && !order.driver && (
                                <div className="mt-4 space-y-2">
                                    <Label>Assign Driver</Label>
                                    <Select onValueChange={handleAssignDriver}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a driver" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableDrivers.map((driver) => (
                                                <SelectItem key={driver.id} value={driver.id.toString()}>
                                                    {driver.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Order Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">Qty</TableHead>
                                    <TableHead className="text-right">Unit Price</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.order_items.map(
                                    (
                                        item, // Changed from orderItems to order_items
                                    ) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                                                    {item.product.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">{format_rupiah(item.price)}</TableCell>
                                            <TableCell className="text-right">{format_rupiah(item.price * item.quantity)}</TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Order Tracking History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Tracking History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {order.tracking.length === 0 ? (
                                <p className="text-muted-foreground text-center">No tracking information available</p>
                            ) : (
                                <div className="relative ml-4 space-y-4 border-l pt-2 pl-6">
                                    {order.tracking.map((track) => (
                                        <div key={track.id} className="relative">
                                            <div className="bg-primary absolute top-1 -left-10 h-4 w-4 rounded-full"></div>
                                            <div>
                                                <p className="font-semibold">{track.status.replace('_', ' ')}</p>
                                                <p className="text-muted-foreground text-sm">{new Date(track.created_at).toLocaleString()}</p>
                                                <p className="mt-1">{track.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
