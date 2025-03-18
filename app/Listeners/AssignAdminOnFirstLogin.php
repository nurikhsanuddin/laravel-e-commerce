<?php

namespace App\Listeners;

use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AssignAdminOnFirstLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $user = $event->user;

        // Periksa apakah user adalah user pertama (ID 1) atau belum punya role
        if (!$user->role || User::count() === 1) {
            $user->update(['role' => 'admin']);
        }
    }
}
