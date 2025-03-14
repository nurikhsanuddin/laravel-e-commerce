<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('categories/index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string'
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')->with('success', 'Category created successfully');
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        return Inertia::render('categories/show', [
            'category' => $category,
            'products' => $category->products
        ]);
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(Category $category)
    {
        return Inertia::render('categories/edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string'
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully');
    }
}
