<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('orderItems.product')
            ->latest()
            ->get();

        return Inertia::render('orders/index', [
            'orders' => $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'payment_method' => $order->payment_method,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at,
                    'items' => $order->orderItems->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product_name' => $item->product->name,
                            'price' => $item->price,
                            'quantity' => $item->quantity,
                            'image' => $item->product->image ? asset('storage/' . $item->product->image) : null,
                        ];
                    }),
                ];
            })
        ]);
    }

    /**
     * Display the specified order details and tracking
     */
    public function show($id)
    {
        $order = Order::with(['orderItems.product', 'tracking'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return Inertia::render('orders/show', [
            'order' => [
                'id' => $order->id,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'payment_method' => $order->payment_method,
                'shipping_address' => $order->shipping_address,
                'shipping_cost' => $order->shipping_cost,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at,
                'items' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product->name,
                        'price' => $item->price,
                        'quantity' => $item->quantity,
                        'image' => $item->product->image ? asset('storage/' . $item->product->image) : null,
                    ];
                }),
                'tracking' => $order->tracking->map(function ($track) {
                    return [
                        'status' => $track->status,
                        'description' => $track->description,
                        'created_at' => $track->created_at,
                    ];
                }),
            ]
        ]);
    }

    /**
     * Upload payment proof for an order
     */
    public function uploadPaymentProof(Request $request, $id)
    {
        $request->validate([
            'payment_proof' => 'required|image|max:2048',
        ]);

        $order = Order::where('user_id', Auth::id())->findOrFail($id);

        // Only allow upload if payment status is pending
        if ($order->payment_status !== 'pending') {
            return back()->with('error', 'Payment proof can only be uploaded for pending payments');
        }

        if ($request->hasFile('payment_proof')) {
            // Delete old payment proof if exists
            if ($order->payment_proof) {
                Storage::delete('public/' . $order->payment_proof);
            }

            // Store the new image
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');

            // Update the order
            $order->payment_proof = $path;
            $order->payment_status = 'processing'; // Change to processing status
            $order->save();

            return back()->with('success', 'Payment proof uploaded successfully');
        }

        return back()->with('error', 'Failed to upload payment proof');
    }
}
