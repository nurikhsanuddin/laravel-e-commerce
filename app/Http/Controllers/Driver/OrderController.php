<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderTracking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'orderItems.product'])
            ->where('driver_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Driver/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function show(Order $order)
    {
        if ($order->driver_id !== auth()->id()) {
            abort(403);
        }

        $order->load(['user', 'orderItems.product', 'tracking']);

        return Inertia::render('Driver/Orders/Show', [
            'order' => [
                'id' => $order->id,
                'user' => [
                    'name' => $order->user->name,
                ],
                'status' => $order->status,
                'shipping_address' => $order->shipping_address,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at,
                'orderItems' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product->name,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'image' => $item->product->image,
                    ];
                }),
            ]
        ]);
    }

    public function markDelivered(Request $request, Order $order)
    {
        if ($order->driver_id !== auth()->id()) {
            abort(403);
        }

        $order->status = 'terkirim';
        $order->save();

        OrderTracking::create([
            'order_id' => $order->id,
            'status' =>    OrderTracking::STATUS_DELIVERED,
            'description' => 'Pesanan telah berhasil diantar ke customer.',
        ]);

        return back()->with('success', 'Order marked as delivered.');
    }
}
