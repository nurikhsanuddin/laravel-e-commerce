<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    /**
     * Add a product to the cart
     */
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check if there's enough stock
        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        $cart = Session::get('cart', []);

        if (isset($cart[$request->product_id])) {
            // Product exists in cart, update quantity
            $cart[$request->product_id]['quantity'] += $request->quantity;
        } else {
            // Product is not in cart, add it
            $cart[$request->product_id] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'quantity' => $request->quantity,
                'image' => $product->image ? asset('storage/' . $product->image) : null,
                'weight' => $product->weight,
            ];
        }

        Session::put('cart', $cart);

        return response()->json([
            'message' => 'Product added to cart successfully',
            'cart' => $cart,
            'cartCount' => count($cart)
        ]);
    }

    /**
     * Get the cart contents
     */
    public function getCart()
    {
        $cart = Session::get('cart', []);

        return response()->json([
            'cart' => $cart,
            'cartCount' => count($cart)
        ]);
    }

    /**
     * Update quantity of a product in the cart
     */
    public function updateCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Session::get('cart', []);

        if (isset($cart[$request->product_id])) {
            // Check stock
            $product = Product::find($request->product_id);
            if ($product && $product->stock >= $request->quantity) {
                $cart[$request->product_id]['quantity'] = $request->quantity;
                Session::put('cart', $cart);

                return response()->json([
                    'message' => 'Cart updated successfully',
                    'cart' => $cart
                ]);
            } else {
                return response()->json([
                    'message' => 'Not enough stock available'
                ], 422);
            }
        }

        return response()->json([
            'message' => 'Product not found in cart'
        ], 404);
    }

    /**
     * Remove a product from the cart
     */
    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $cart = Session::get('cart', []);

        if (isset($cart[$request->product_id])) {
            unset($cart[$request->product_id]);
            Session::put('cart', $cart);

            return response()->json([
                'message' => 'Product removed from cart',
                'cart' => $cart,
                'cartCount' => count($cart)
            ]);
        }

        return response()->json([
            'message' => 'Product not found in cart'
        ], 404);
    }

    /**
     * Clear the entire cart
     */
    public function clearCart()
    {
        Session::forget('cart');

        return response()->json([
            'message' => 'Cart cleared successfully',
            'cart' => [],
            'cartCount' => 0
        ]);
    }
}
