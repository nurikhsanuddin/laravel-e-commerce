<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'user' => $user,
            'availableRoles' => User::getAvailableRoles()
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', Rule::in(User::getAvailableRoles())]
        ]);

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user
        ]);
    }
}
