<?php

namespace App\Services\Contracts;

use App\Models\Contract;

class StoreContracts
{
    public function execute(array $contractData, bool $isAvailable = true, bool $isCustom = false, int $userId = null): void
    {
        foreach ($contractData as $contractDatum) {
            $contract = new Contract();
            $contract->dep_airport_id = $contractDatum['departure'];
            $contract->current_airport_id = $contractDatum['departure'];
            $contract->arr_airport_id = $contractDatum['destination'];
            $contract->distance = $contractDatum['distance'];
            $contract->heading = $contractDatum['heading'];
            $contract->cargo_type = $contractDatum['cargo_type'];
            $contract->cargo = $contractDatum['cargo'];
            $contract->cargo_qty = $contractDatum['cargo_qty'];
            $contract->contract_value = $contractDatum['contract_value'];
            $contract->cargo_available = $contractDatum['cargo_qty'];
            $contract->expires_at = $contractDatum['expires_at'];
            $contract->is_available = $isAvailable;
            $contract->save();
        }
    }
}
