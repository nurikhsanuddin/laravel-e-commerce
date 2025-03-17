<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
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
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
