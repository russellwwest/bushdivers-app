<?php

namespace App\Services\Contracts;

class GetNumberOfContractsToGenerate
{
    public function execute(int $contractCount, int $airportSize, bool $isHub): int
    {
        $numberToGenerate = 0;
        if ($contractCount <= 10) {
            if ($isHub) {
                $numberToGenerate = 25 - $contractCount;
            } else {
                $numberToGenerate = $airportSize >= 3 ? 18 - $contractCount : 9 - $contractCount;
            }
        }
        return $numberToGenerate;
    }
}
