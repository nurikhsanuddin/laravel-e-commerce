<?php

// database/migrations/2025_03_14_000004_create_orders_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('payment_method');
            $table->text('shipping_address');
            $table->decimal('shipping_cost', 10, 2);
            $table->unsignedBigInteger('driver_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('driver_id')
                ->references('id')->on('users')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
