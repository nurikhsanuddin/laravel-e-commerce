<?php


// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Payment status constants
    const PAYMENT_STATUS_PENDING = 'menunggu';
    const PAYMENT_STATUS_PROCESSING = 'diproses';
    const PAYMENT_STATUS_PAID = 'terbayar';
    const PAYMENT_STATUS_FAILED = 'gagal';

    // Order status constants
    const STATUS_PENDING = 'menunggu';
    const STATUS_PROCESSING = 'diproses';
    const STATUS_OUT_FOR_DELIVERY = 'driver_telah_ditugaskan';
    const STATUS_DELIVERED = 'terkirim';
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
