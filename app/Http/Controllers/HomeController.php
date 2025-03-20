<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Show the home page with featured products.
     */
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->where('stock', '>', 0)
            ->latest()
            // ->take(8)
            ->get();

        $categories = Category::all();

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => (float) $product->price,
                    'stock' => $product->stock,
                    'image' => $product->image ? asset('storage/' . $product->image) : null,
                    'category' => $product->category ? $product->category->name : null,
                    'category_id' => $product->category_id,
                    'weight' => $product->weight,
                    'dimensions' => $product->dimensions,
                ];
            }),
            'categories' => $categories
        ]);
    }
}
