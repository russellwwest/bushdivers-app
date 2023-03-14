<?php

namespace App\Services\Contracts;

use App\Models\Airport;
use Illuminate\Support\Facades\DB;

class GetAirportsForContractGeneration
{
    public function execute($startAirport): \Illuminate\Support\Collection
    {
        // get airports within radius
        $airports = DB::table('airports')
            ->selectRaw("airports.*, 3956 * ACOS(COS(RADIANS($startAirport->lat)) * COS(RADIANS(lat)) * COS(RADIANS($startAirport->lon) - RADIANS(lon)) + SIN(RADIANS($startAirport->lat)) * SIN(RADIANS(lat))) AS `distance`")
            ->havingRaw('distance > 5 AND distance < 150')
            ->orderByRaw('distance')
            ->get();

        return collect($airports);
    }
}
