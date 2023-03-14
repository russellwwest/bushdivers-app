<?php

namespace App\Services\Contracts;

use App\Services\Geo\GetBearingBetweenPoints;
use App\Services\Geo\GetDistanceBetweenPoints;
use Carbon\Carbon;

class GenerateContractDetails
{
    protected GenerateCargo $generateCargo;
    protected GetDistanceBetweenPoints $getDistanceBetweenPoints;
    protected GetBearingBetweenPoints $getBearingBetweenPoints;
    protected CalculateContractValue $calculateContractValue;

    public function __construct(GenerateCargo $generateCargo, GetDistanceBetweenPoints $getDistanceBetweenPoints, GetBearingBetweenPoints $getBearingBetweenPoints, CalculateContractValue $calculateContractValue)
    {
        $this->generateCargo = $generateCargo;
        $this->getDistanceBetweenPoints = $getDistanceBetweenPoints;
        $this->getBearingBetweenPoints = $getBearingBetweenPoints;
        $this->calculateContractValue = $calculateContractValue;
    }

    public function execute($origin, $destination): array
    {
        // generate cargo
        $cargo = $this->generateCargo->execute();
        // get distance and headings
        $distance = $this->getDistanceBetweenPoints->execute(
            ['lat' => $origin->lat, 'lon' => $origin->lon],
            ['lat' => $destination->lat, 'lon' => $destination->lon]
        );
        $bearing = $this->getBearingBetweenPoints->execute(
            ['lat' => $origin->lat, 'lon' => $origin->lon],
            ['lat' => $destination->lat, 'lon' => $destination->lon],
            $destination->magnetic_variance
        );
        // expiry date
        $expiry = Carbon::now()->addDays(rand(1,8));
        $expiryMultiplier = match (true) {
            $expiry > Carbon::now()->addDays(5) && $expiry < Carbon::now()->addDays(7) => 1.2,
            $expiry > Carbon::now()->addDays(3) && $expiry < Carbon::now()->addDays(5) => 1.5,
            $expiry > Carbon::now()->addDay() && $expiry < Carbon::now()->addDays(3) => 1.8,
            $expiry < Carbon::now()->addHours(24) => 2.0,
            default => 1.0,
        };
        // contract value
        $contractValue = $this->calculateContractValue->execute($cargo['type'], $cargo['qty'], $distance, $expiryMultiplier);
        // build contract
        return [
            'departure' => $origin->identifier,
            'destination' => $destination->identifier,
            'cargo' => $cargo['name'],
            'cargo_type' => $cargo['type'],
            'cargo_qty' => $cargo['qty'],
            'distance' => $distance,
            'heading' => $bearing,
            'contract_value' => $contractValue,
            'expires_at' => $expiry
        ];
    }
}
