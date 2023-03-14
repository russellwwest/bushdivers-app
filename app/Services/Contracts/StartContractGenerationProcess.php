<?php

namespace App\Services\Contracts;

class StartContractGenerationProcess
{
    protected GenerateContractDetails $generateContractDetails;

    public function __construct(GenerateContractDetails $generateContractDetails)
    {
        $this->generateContractDetails = $generateContractDetails;
    }

    public function execute($startAirport, $allAirports, int $numberToGenerate)
    {
        if ($allAirports->count() === 1) {
            $numberToGenerate = 4;
        }
        if ($allAirports->count() < $numberToGenerate && $allAirports->count() > 1) {
            $numberToGenerate = $numberToGenerate / 2;
        }

        $contracts = [];
        $i = 1;
        while ($i <= $numberToGenerate) {
            $destAirport = $allAirports->random(1);

            if ($startAirport->identifier != $destAirport[0]->identifier) {
                $contract = $this->generateContractDetails->execute($startAirport, $destAirport[0]);
                $contracts[] = $contract;
            }
            $i++;
        }
        return $contracts;
    }
}
