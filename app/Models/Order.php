<?php


// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Payment status constants
    const PAYMENT_STATUS_PENDING = 'pending';
    const PAYMENT_STATUS_PROCESSING = 'processing';
    const PAYMENT_STATUS_PAID = 'paid';
    const PAYMENT_STATUS_FAILED = 'failed';

    // Order status constants
    const STATUS_PENDING = 'pending';
    const STATUS_PROCESSING = 'processing';
    const STATUS_OUT_FOR_DELIVERY = 'shipped';
    const STATUS_DELIVERED = 'delivered';
    const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'user_id',
        'total_price',
        'status',
        'payment_status',
        'payment_method',
        'payment_proof',
        'shipping_address',
        'shipping_cost',
        'driver_id',
    ];

    // Relasi: Order dimiliki oleh seorang customer
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi: Order diantar oleh driver (nullable)
    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    // Relasi: Satu order memiliki banyak order item
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Relasi: Satu order memiliki banyak tracking (riwayat status)
    public function tracking()
    {
        return $this->hasMany(OrderTracking::class);
    }
}
