<?php

namespace App\Services\Geo;

use Location\Bearing\BearingEllipsoidal;
use Location\Coordinate;

class GetBearingBetweenPoints
{
    public function execute(array $start, array $end, float $endVariance): int
    {
        $startCoordinate = new Coordinate($start['lat'], $start['lon']);
        $endCoordinate = new Coordinate($end['lat'], $end['lon']);

        $bearingCalc = new BearingEllipsoidal();
        $bearing = $bearingCalc->calculateBearing($startCoordinate, $endCoordinate);
        $alteredBearing = $bearing - $endVariance;

        return $alteredBearing < 0 ? $alteredBearing + 360 : $alteredBearing;
    }
}
