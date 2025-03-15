<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\DriverMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
    AdminMiddleware::class,

    // Add admin middleware to ensure only admins can access
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
