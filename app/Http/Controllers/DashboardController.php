<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Get total sales
        $totalSales = Order::where('payment_status', Order::PAYMENT_STATUS_PAID)->sum('total_price');

        // Get pending orders count
        $pendingOrders = Order::where('status', Order::STATUS_PENDING)->count();

        // Get processing orders count
        $processingOrders = Order::where('status', Order::STATUS_PROCESSING)->count();
        $shippingOrders = Order::where('status', Order::STATUS_OUT_FOR_DELIVERY)->count();
        $finalProcessingOrders = $processingOrders + $shippingOrders;
        // Get delivered orders count
        $deliveredOrders = Order::where('status', Order::STATUS_DELIVERED)->count();

        // Get total customers
        $totalCustomers = User::where('role', 'user')->count();

        // Get total products
        $totalProducts = Product::count();

        // Get low stock products (less than 10 items)
        $lowStockProducts = Product::where('stock', '<', 10)->count();

        // Get top selling products
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.payment_status', Order::PAYMENT_STATUS_PAID)
            ->select(
                'products.id',
                'products.name',
                'products.image',
                DB::raw('SUM(order_items.quantity) as total_quantity'),
                DB::raw('SUM(order_items.price * order_items.quantity) as total_sales')
            )
            ->groupBy('products.id', 'products.name', 'products.image')
            ->orderBy('total_quantity', 'desc')
            ->limit(5)
            ->get();

        // Get recent orders
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Get sales by category
        $salesByCategory = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.payment_status', Order::PAYMENT_STATUS_PAID)
            ->select('categories.name', DB::raw('SUM(order_items.price * order_items.quantity) as total_sales'))
            ->groupBy('categories.name')
            ->orderBy('total_sales', 'desc')
            ->get();

        return Inertia::render('dashboard', [
            'dashboardData' => [
                'totalSales' => $totalSales,
                'pendingOrders' => $pendingOrders,
                'processingOrders' => $finalProcessingOrders,
                'deliveredOrders' => $deliveredOrders,
                'totalCustomers' => $totalCustomers,
                'totalProducts' => $totalProducts,
                'lowStockProducts' => $lowStockProducts,
                'topProducts' => $topProducts,
                'recentOrders' => $recentOrders,
                'salesByCategory' => $salesByCategory,
            ]
        ]);
    }
}
