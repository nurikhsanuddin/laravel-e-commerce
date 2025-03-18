<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Driver\OrderController as DriverOrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\DriverMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Cart routes (no auth required)
Route::prefix('cart')->group(function () {
    Route::post('/add', [CartController::class, 'addToCart'])->name('cart.add');
    Route::get('/get', [CartController::class, 'getCart'])->name('cart.get');
    Route::post('/update', [CartController::class, 'updateCart'])->name('cart.update');
    Route::post('/remove', [CartController::class, 'removeFromCart'])->name('cart.remove');
    Route::post('/clear', [CartController::class, 'clearCart'])->name('cart.clear');
});

// Authentication required routes
Route::middleware(['auth'])->group(function () {
    // Checkout routes
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');

    // Order management routes
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // Order payment proof upload
    Route::post('/orders/{id}/payment-proof', [OrderController::class, 'uploadPaymentProof'])
        ->name('orders.payment-proof');
});

// Admin routes
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
    AdminMiddleware::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // User management routes
    Route::resource('users', UserController::class)->except(['create', 'store', 'destroy']);

    // Categories routes
    Route::resource('categories', CategoryController::class);

    // Products routes
    Route::resource('products', ProductController::class);


    Route::get('/admin/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/admin/orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('admin.orders.show');
    Route::post('/admin/orders/{id}/verify-payment', [App\Http\Controllers\Admin\OrderController::class, 'verifyPayment'])->name('admin.orders.verify-payment');
    Route::post('/admin/orders/{id}/assign-driver', [App\Http\Controllers\Admin\OrderController::class, 'assignDriver'])->name('admin.orders.assign-driver');
    Route::post('/admin/orders/{id}/reject', [App\Http\Controllers\Admin\OrderController::class, 'rejectOrder'])->name('admin.orders.reject');


    Route::get('/driver/orders', [DriverOrderController::class, 'index'])->name('driver.orders.index');
    Route::get('/driver/orders/{order}', [DriverOrderController::class, 'show'])->name('driver.orders.show');
    Route::post('/driver/orders/{order}/delivered', [DriverOrderController::class, 'markDelivered'])->name('driver.orders.delivered');
});

// Product detail route
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');



// Admin Order Routes
// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/admin/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('admin.orders.index');
//     Route::get('/admin/orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('admin.orders.show');
//     Route::post('/admin/orders/{id}/verify-payment', [App\Http\Controllers\Admin\OrderController::class, 'verifyPayment'])->name('admin.orders.verify-payment');
//     Route::post('/admin/orders/{id}/assign-driver', [App\Http\Controllers\Admin\OrderController::class, 'assignDriver'])->name('admin.orders.assign-driver');
//     Route::post('/admin/orders/{id}/reject', [App\Http\Controllers\Admin\OrderController::class, 'rejectOrder'])->name('admin.orders.reject');
// });

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
