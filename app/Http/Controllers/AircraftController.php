<?php

namespace App\Http\Controllers;

use App\Models\Aircraft;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AircraftController extends Controller
{
    public function rentAircraft(Request $request): JsonResponse
    {
        $aircraft = Aircraft::find($request->aircraft_id);
        if ($aircraft->user_id == $request->user_id) {
            $aircraft->user_id = null;
        } else {
            $aircraft->user_id = $request->user_id;
        }
        $aircraft->save();

        return response()->json(['message' => 'Success']);
    }
}
