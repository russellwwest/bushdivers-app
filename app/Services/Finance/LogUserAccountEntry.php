<?php

namespace App\Services\Finance;

use App\Models\UserAccountLedger;

class LogUserAccountEntry
{
    protected UpdateUserBalance $updateUserBalance;

    public function __construct(UpdateUserBalance $updateUserBalance)
    {
        $this->updateUserBalance = $updateUserBalance;
    }

    public function execute(int $userId, int $type, float $total, string $pirepId = null): void
    {
        UserAccountLedger::create([
            'user_id' => $userId,
            'transaction_type' => $type,
            'total' => $total,
            'pirep_id' => $pirepId
        ]);

        $this->updateUserBalance->execute($userId, $total);
    }
}
