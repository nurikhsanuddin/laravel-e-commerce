<?php
// app/Models/OrderItem.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'product_id', 'quantity', 'price',
    ];

    // Relasi: Order item milik sebuah order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relasi: Order item berhubungan dengan satu produk
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
