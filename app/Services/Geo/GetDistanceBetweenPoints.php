<?php

namespace App\Services\Geo;

use App\Enums\CalculationConsts;
use Location\Coordinate;
use Location\Distance\Haversine;

class GetDistanceBetweenPoints
{
    public function execute(array $start, array $end, $unit = 'nm')
    {
        $startCoordinate = new Coordinate($start['lat'], $start['lon']);
        $endCoordinate = new Coordinate($end['lat'], $end['lon']);

        $calc = new Haversine();
        $distance = $calc->getDistance($startCoordinate, $endCoordinate);
        if ($unit == 'nm') {
            return round($distance / CalculationConsts::MetersToNM, 2);
        }
        return round($distance,2);
    }
}
