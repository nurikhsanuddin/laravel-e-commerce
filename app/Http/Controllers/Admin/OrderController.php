<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderTracking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of incoming orders.
     */
    public function index()
    {
        $orders = Order::with(['user', 'orderItems.product', 'tracking'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    /**
     * Display a specific order.
     */
    public function show($id)
    {
        $order = Order::with(['user', 'orderItems.product', 'tracking', 'driver'])
            ->findOrFail($id);

        $availableDrivers = User::where('role', 'driver')->get();

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'availableDrivers' => $availableDrivers
        ]);
    }

    /**
     * Verify payment proof and update order status.
     */
    public function verifyPayment(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        if ($order->payment_status !== 'diproses') {
            return back()->with('error', 'This payment has already been processed.');
        }

        // Update order status
        $order->payment_status = Order::PAYMENT_STATUS_PAID;
        $order->status = Order::STATUS_PROCESSING;
        $order->save();

        // Add tracking entry
        OrderTracking::create([
            'order_id' => $order->id,
            'status' => OrderTracking::STATUS_PAYMENT_VERIFIED,
            'description' => 'Pembayran telah diverifikasi dan pesanan anda sedang diproses.'
        ]);

        return back()->with('success', 'Payment has been verified successfully.');
    }

    /**
     * Assign a driver to the order.
     */
    public function assignDriver(Request $request, $id)
    {
        $request->validate([
            'driver_id' => 'required|exists:users,id'
        ]);

        $order = Order::findOrFail($id);
        $order->driver_id = $request->driver_id;
        $order->status = Order::STATUS_OUT_FOR_DELIVERY;
        $order->save();

        // Add tracking entry
        OrderTracking::create([
            'order_id' => $order->id,
            'status' => OrderTracking::STATUS_OUT_FOR_DELIVERY,
            'description' => 'Driver telah ditugaskan untuk mengantar pesanan.'
        ]);

        return back()->with('success', 'Driver has been assigned successfully.');
    }

    /**
     * Reject an order and update its status.
     */
    public function rejectOrder(Request $request, $id)
    {
        $request->validate([
            'rejection_reason' => 'required|string'
        ]);

        $order = Order::findOrFail($id);
        $order->status = Order::STATUS_CANCELLED;
        $order->payment_status = Order::PAYMENT_STATUS_FAILED;
        $order->save();

        // Add tracking entry
        OrderTracking::create([
            'order_id' => $order->id,
            'status' => OrderTracking::STATUS_CANCELLED,
            'description' => 'Order has been rejected: ' . $request->rejection_reason
        ]);

        return back()->with('success', 'Order has been rejected.');
    }
}
