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
        // $shipping_cost = max(0, $weight * 0.5); // Base cost of $10 or $0.5 per weight unit
        $shipping_cost = 0; // Base cost of $10 or $0.5 per weight unit

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

        // Validate product existence before processing
        foreach ($cart as $key => $item) {
            $product = Product::find($item['id']);
            if (!$product) {
                // Remove invalid product from cart
                unset($cart[$key]);
                continue;
            }

            // Ensure we're using the latest product data
            $cart[$key]['price'] = $product->price;
            $cart[$key]['weight'] = $product->weight ?? 0;

            // Check if we have enough stock
            if ($product->stock < $item['quantity']) {
                return redirect()->route('cart')->with('error', "Not enough stock available for {$product->name}. Available: {$product->stock}");
            }
        }

        // Update the cart in session after cleaning
        Session::put('cart', $cart);

        // If the cart became empty after validation, redirect
        if (empty($cart)) {
            return redirect()->route('home')->with('error', 'Your cart contains invalid products');
        }

        $subtotal = 0;
        $weight = 0;

        foreach ($cart as $item) {
            $subtotal += $item['price'] * $item['quantity'];
            $weight += ($item['weight'] ?? 0) * $item['quantity'];
        }

        // $shipping_cost = max(0, $weight * 0.5);
        $shipping_cost = 0;
        $total = $subtotal + $shipping_cost;

        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'total_price' => $total,
            'status' => Order::STATUS_PENDING,
            'payment_status' => Order::PAYMENT_STATUS_PENDING,
            'payment_method' => $request->payment_method,
            'shipping_address' => $request->shipping_address,
            'shipping_cost' => $shipping_cost,
        ]);

        // Create order items and update product stock
        foreach ($cart as $item) {
            $product = Product::find($item['id']);

            // Double check that the product exists
            if ($product) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);

                $product->stock -= $item['quantity'];
                $product->save();
            }
        }

        // Create initial tracking entry
        OrderTracking::create([
            'order_id' => $order->id,
            'status' => 'Pesanan Dibuat',
            'description' => 'Pesanan Anda telah dibuat dan sedang diproses.',
        ]);

        // Clear the cart
        Session::forget('cart');

        return redirect()->route('orders.show', $order->id)->with('success', 'Order placed successfully');
    }
}
