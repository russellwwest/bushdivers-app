<?php

namespace App\Http\Controllers;

use App\Models\AircraftType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FleetController extends Controller
{
    public function index(): Response
    {
        $aircraftTypes = AircraftType::with(['manufacturer', 'aircraft' => function ($q) {
            $q->where('owner_id', 0);
            $q->orderBy('home_location');
        }])
            ->where('is_bushdivers', true)
            ->orderBy('identifier')
            ->get();
        return Inertia::render('Aircraft/Fleet', ['aircraftTypes' => $aircraftTypes]);
    }
}
