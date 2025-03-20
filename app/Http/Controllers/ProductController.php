<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::with('category')->latest()->paginate(10);

        // Convert prices to float in the collection
        $products->getCollection()->transform(function ($product) {
            $product->price = (float) $product->price;
            return $product;
        });

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        // Load the category relationship
        $product->load('category');

        // Convert the category to string to avoid rendering issues in React
        $product->category = $product->category?->name;

        // Get related products from the same category (max 4)
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        // Convert the category to string for related products
        $relatedProducts->each(function ($item) {
            $item->category = $item->category?->name;
        });

        return Inertia::render('product-detail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'productImages' => asset($product->image) ? [
                asset('storage/' . $product->image)
            ] : [],
            'auth' => [
                'user' => auth()->user() ? [
                    'name' => auth()->user()->name,
                    'role' => auth()->user()->role,
                ] : null,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        // Ensure price is a number
        $product->price = (float) $product->price;

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        // Delete image if exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}
