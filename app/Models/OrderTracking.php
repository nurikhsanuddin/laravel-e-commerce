<?php

// app/Models/OrderTracking.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderTracking extends Model
{
    // Status constants
    const STATUS_CREATED = 'dibuat';
    const STATUS_PAYMENT_PENDING = 'payment_pending';
    const STATUS_PAYMENT_VERIFIED = 'pembayaran_terverifikasi';
    const STATUS_PAYMENT_FAILED = 'pembayaran_gagal';
    const STATUS_PROCESSING = 'diproses';
    const STATUS_OUT_FOR_DELIVERY = 'driver_telah_ditugaskan';
    const STATUS_DELIVERED = 'terkirim';
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
