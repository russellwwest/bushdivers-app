<?php

namespace App\Services\Crew;

use App\Enums\CalculationConsts;

class CalcJumpseatCost
{
    public function execute(float $distance): float
    {
        return round($distance * CalculationConsts::JumpseatMultiplier,2);
    }
}
