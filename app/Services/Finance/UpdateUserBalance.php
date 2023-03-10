<?php

namespace App\Services\Finance;

use App\Models\User;

class UpdateUserBalance
{
    public function execute(int $userId, float $total): void
    {
        $user = User::find($userId);
        $user->cash+= $total;
        $user->save();
    }
}
