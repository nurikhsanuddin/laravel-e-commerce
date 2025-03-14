<?php

use App\Http\Controllers\CategoryController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
    AdminMiddleware::class, // Add admin middleware to ensure only admins can access
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('users', function () {
        return Inertia::render('users');
    })->name('users');

    // Categories routes
    Route::resource('categories', CategoryController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
