<?php

// database/migrations/2025_03_14_000006_create_order_tracking_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('order_tracking', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->string('status');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->foreign('order_id')
                ->references('id')->on('orders')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_tracking');
    }
};
