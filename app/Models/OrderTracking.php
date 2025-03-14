<?php

// app/Models/OrderTracking.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderTracking extends Model
{
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
