<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderTracking;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Show the checkout page
     */
    public function index()
    {
        $cart = Session::get('cart', []);

        if (empty($cart)) {
            return redirect()->route('home')->with('error', 'Your cart is empty');
        }

        $total = 0;
        $weight = 0;

        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
            $weight += ($item['weight'] ?? 0) * $item['quantity'];
        }

        // Simplified shipping cost calculation based on weight
        $shipping_cost = max(0, $weight * 0.5); // Base cost of $10 or $0.5 per weight unit

        return Inertia::render('Checkout', [
            'cart' => $cart,
            'subtotal' => $total,
            'shipping_cost' => $shipping_cost,
            'total' => $total + $shipping_cost
        ]);
    }

    /**
     * Process the order
     */
    public function process(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'payment_method' => 'required|string|in:credit_card,bank_transfer,cash_on_delivery'
        ]);

        $cart = Session::get('cart', []);

        if (empty($cart)) {
            return redirect()->route('home')->with('error', 'Your cart is empty');
        }

        $subtotal = 0;
        $weight = 0;

        foreach ($cart as $item) {
            $subtotal += $item['price'] * $item['quantity'];
            $weight += ($item['weight'] ?? 0) * $item['quantity'];
        }

        $shipping_cost = max(0, $weight * 0.5);
        $total = $subtotal + $shipping_cost;

        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'total_price' => $total,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => $request->payment_method,
            'shipping_address' => $request->shipping_address,
            'shipping_cost' => $shipping_cost,
        ]);

        // Create order items and update product stock
        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ]);

            $product = Product::find($item['id']);
            if ($product) {
                $product->stock -= $item['quantity'];
                $product->save();
            }
        }

        // Create initial tracking entry
        OrderTracking::create([
            'order_id' => $order->id,
            'status' => 'order_placed',
            'description' => 'Your order has been placed successfully'
        ]);

        // Clear the cart
        Session::forget('cart');

        return redirect()->route('orders.show', $order->id)->with('success', 'Order placed successfully');
    }
}
