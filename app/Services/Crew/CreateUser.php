<?php

namespace App\Services\Crew;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUser
{
    public function execute(string $name, string $email, string $password): int
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        return $user->id;
    }
}
