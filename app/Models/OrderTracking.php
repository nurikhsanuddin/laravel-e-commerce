<?php

// app/Models/OrderTracking.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderTracking extends Model
{
    // Status constants
    const STATUS_CREATED = 'created';
    const STATUS_PAYMENT_PENDING = 'payment_pending';
    const STATUS_PAYMENT_VERIFIED = 'payment_verified';
    const STATUS_PAYMENT_FAILED = 'payment_failed';
    const STATUS_PROCESSING = 'processing';
    const STATUS_OUT_FOR_DELIVERY = 'out_for_delivery';
    const STATUS_DELIVERED = 'delivered';
    const STATUS_CANCELLED = 'cancelled';

    protected $table = 'order_tracking';

    protected $fillable = [
        'order_id', 'status', 'description',
    ];

    // Relasi: Riwayat tracking milik sebuah order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
