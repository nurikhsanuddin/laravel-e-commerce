<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all categories or create one if none exist
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $categories = Category::factory(3)->create();
        }

        // Create products for each category
        foreach ($categories as $category) {
            Product::factory(5)->create([
                'category_id' => $category->id,
            ]);
        }
    }
}
