<?php

namespace App\Services\Contracts;

use App\Enums\ContractValueTypes;

class CalculateContractValue
{
    public function execute(int $cargoType, int $cargoQty, int $distance, float $expiryMultiplier): float
    {
        $weightMultiplier = ContractValueTypes::CargoValue;
        $paxMultiplier = ContractValueTypes::PaxValue;
        $distanceMultiplier = ContractValueTypes::DistanceValue;

        if ($cargoType == 1) {
            $cargoValue = $cargoQty * $weightMultiplier;
            $distanceValue = ($distance / 50) * $distanceMultiplier;
            $value = $cargoValue + $distanceValue;
        } else {
            $cargoValue = $cargoQty * $paxMultiplier;
            $distanceValue = ($distance / 50) * $distanceMultiplier;
            $value = $cargoValue + $distanceValue;
        }
        return round($value * $expiryMultiplier);
    }
}
