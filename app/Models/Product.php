<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'stock', 'category_id', 'image', 'weight', 'dimensions',
    ];

    // Relasi: Satu produk termasuk ke dalam satu kategori
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relasi: Satu produk dapat muncul di banyak order item
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
