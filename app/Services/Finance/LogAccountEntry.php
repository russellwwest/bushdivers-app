<?php

namespace App\Services\Finance;

use App\Models\AccountLedger;

class LogAccountEntry
{
    public function execute(int $type, float $total, string $memo = null, string $pirepId = null): void
    {
        AccountLedger::create([
            'transaction_type' => $type,
            'total' => $total,
            'memo' => $memo,
            'pirep_id' => $pirepId
        ]);
    }
}
