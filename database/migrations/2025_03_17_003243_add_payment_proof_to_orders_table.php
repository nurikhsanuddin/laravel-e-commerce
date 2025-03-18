<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('payment_proof')->nullable()->after('payment_method');
        });

        // For PostgreSQL, we need to drop and recreate the column instead of using change()
        if (DB::connection()->getDriverName() === 'pgsql') {
            // First backup the current values
            DB::statement('ALTER TABLE orders ADD COLUMN payment_status_new VARCHAR(255) DEFAULT \'pending\'');
            DB::statement('UPDATE orders SET payment_status_new = payment_status::VARCHAR');

            // Drop the old column
            Schema::table('orders', function (Blueprint $table) {
                $table->dropColumn('payment_status');
            });

            // Create the new column with the updated enum values
            Schema::table('orders', function (Blueprint $table) {
                $table->enum('payment_status', ['pending', 'processing', 'paid', 'failed'])
                    ->default('pending')
                    ->after('payment_proof');
            });

            // Restore the values
            DB::statement('UPDATE orders SET payment_status = payment_status_new');

            // Drop the temporary column
            Schema::table('orders', function (Blueprint $table) {
                $table->dropColumn('payment_status_new');
            });
        } else {
            // For MySQL, we can use the standard change method
            Schema::table('orders', function (Blueprint $table) {
                $table->enum('payment_status', ['pending', 'processing', 'paid', 'failed'])->default('pending')->change();
            });
        }
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('payment_proof');
        });

        // Handle rollback for PostgreSQL
        if (DB::connection()->getDriverName() === 'pgsql') {
            // First backup the current values
            DB::statement('ALTER TABLE orders ADD COLUMN payment_status_old VARCHAR(255) DEFAULT \'pending\'');
            DB::statement('UPDATE orders SET payment_status_old = payment_status::VARCHAR');

            // Drop the new column
            Schema::table('orders', function (Blueprint $table) {
                $table->dropColumn('payment_status');
            });

            // Recreate the original column
            Schema::table('orders', function (Blueprint $table) {
                $table->enum('payment_status', ['pending', 'paid', 'failed'])
                    ->default('pending')
                    ->after('status');
            });

            // Restore the values (processing values will revert to default)
            DB::statement('UPDATE orders SET payment_status = 
                CASE 
                    WHEN payment_status_old = \'processing\' THEN \'pending\'
                    ELSE payment_status_old 
                END');

            // Drop the temporary column
            Schema::table('orders', function (Blueprint $table) {
                $table->dropColumn('payment_status_old');
            });
        } else {
            // For MySQL
            Schema::table('orders', function (Blueprint $table) {
                $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending')->change();
            });
        }
    }
};
