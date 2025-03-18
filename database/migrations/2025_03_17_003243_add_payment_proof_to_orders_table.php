<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('payment_proof')->nullable()->after('payment_method');
            // Change payment_status enum to include 'processing' value
            $table->enum('payment_status', ['pending', 'processing', 'paid', 'failed'])->default('pending')->change();
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('payment_proof');
            // Return payment_status to original values
            $table->enum('payment_status', ['pending', 'processing', 'paid', 'failed'])->default('pending')->change();
        });
    }
};
