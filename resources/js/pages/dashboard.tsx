import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatCurrency } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, CreditCard, Package, ShoppingCart, TruckIcon, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    dashboardData: {
        totalSales: number;
        pendingOrders: number;
        processingOrders: number;
        deliveredOrders: number;
        totalCustomers: number;
        totalProducts: number;
        lowStockProducts: number;
        topProducts: Array<{
            id: number;
            name: string;
            image: string | null;
            total_quantity: number;
            total_sales: number;
        }>;
        recentOrders: Array<{
            id: number;
            total_price: number;
            status: string;
            payment_status: string;
            created_at: string;
            user: {
                name: string;
                email: string;
            };
        }>;
        salesByCategory: Array<{
            name: string;
            total_sales: number;
        }>;
    };
}

export default function Dashboard({ dashboardData }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
                            <CreditCard className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(dashboardData.totalSales)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pelanggan</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Produk</CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
                            {/* <p className="text-muted-foreground text-xs">{dashboardData.lowStockProducts} stok menipis</p> */}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Status Pesanan</CardTitle>
                            <ShoppingCart className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between text-sm">
                                <div className="flex flex-col items-center">
                                    <Clock className="h-4 w-4 text-orange-500" />
                                    <span>{dashboardData.pendingOrders}</span>
                                    <span className="text-[10px]">Menunggu</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <TruckIcon className="h-4 w-4 text-blue-500" />
                                    <span>{dashboardData.processingOrders}</span>
                                    <span className="text-[10px]">Diproses</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>{dashboardData.deliveredOrders}</span>
                                    <span className="text-[10px]">Terkirim</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Products and Recent Orders */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Top Products */}
                    <Card className="col-span-1 overflow-hidden">
                        <CardHeader>
                            <CardTitle>Produk Terlaris</CardTitle>
                            <CardDescription>5 produk dengan penjualan tertinggi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="divide-y">
                                {dashboardData.topProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between py-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-muted flex size-12 items-center justify-center overflow-hidden rounded-md border">
                                                {product.image ? (
                                                    <img src={`/storage/${product.image}`} alt={product.name} className="size-full object-cover" />
                                                ) : (
                                                    <Package className="h-6 w-6" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="line-clamp-1 text-sm font-medium">{product.name}</p>
                                                <p className="text-muted-foreground text-xs">{product.total_quantity} unit terjual</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">{formatCurrency(product.total_sales)}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Orders */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Pesanan Terbaru</CardTitle>
                            <CardDescription>5 pesanan terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="divide-y">
                                {dashboardData.recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between py-3">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Pesanan #{order.id}</p>
                                            <p className="text-muted-foreground text-xs">{order.user.name}</p>
                                            <div className="flex items-center space-x-2">
                                                <div
                                                    className={`size-2 rounded-full ${
                                                        order.payment_status === 'terbayar'
                                                            ? 'bg-green-500'
                                                            : order.payment_status === 'diproses'
                                                              ? 'bg-blue-500'
                                                              : 'bg-orange-500'
                                                    }`}
                                                />
                                                <p className="text-xs capitalize">
                                                    {order.status} - {order.payment_status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{formatCurrency(order.total_price)}</p>
                                            <p className="text-muted-foreground text-xs">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sales by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle>Penjualan per Kategori</CardTitle>
                        <CardDescription>Distribusi pendapatan berdasarkan kategori produk</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y">
                            {dashboardData.salesByCategory.map((category, index) => (
                                <div key={index} className="flex items-center justify-between py-3">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{category.name}</p>
                                    </div>
                                    <div className="text-sm font-medium">{formatCurrency(category.total_sales)}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
