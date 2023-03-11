<?php

namespace App\Services\Crew;

use App\Models\User;

class UpdateUserLocation
{
    public function execute(int $userId, string $icao): void
    {
        $user = User::find($userId);
        $user->current_airport_id = $icao;
        $user->save();
    }
}
