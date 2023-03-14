<?php

namespace App\Http\Controllers;

use App\Services\Airport\GetMetarForAirport;
use App\Services\Airport\GetNearestMetar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AirportController extends Controller
{
    public function metar($icao, GetMetarForAirport $getMetarForAirport, GetNearestMetar $getNearestMetar): JsonResponse
    {
        $metarData = $getMetarForAirport->execute($icao);
        if ($metarData['status'] != 'empty') {
            return response()->json(['metar' => $metarData['results']]);
        } else {
            $nearest = $getNearestMetar->execute($icao);
            if ($nearest['status'] == 'success') {
                return response()->json(['metar' => $metarData['results']]);
            }
        }
        abort(404);
    }
}
