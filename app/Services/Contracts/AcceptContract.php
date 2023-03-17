<?php

namespace App\Services\Contracts;

use App\Models\Contract;

class AcceptContract
{
    public function execute(int $contractId, int $userId = null, bool $isAccepting = true): void
    {
        $contract = Contract::find($contractId);
        $contract->user_id = $userId;
        $contract->is_available = !$isAccepting;
        $contract->save();
    }
}
