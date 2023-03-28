<?php

namespace App\Http\Controllers;

use App\Models\Aircraft;
use App\Models\Airport;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DispatchController extends Controller
{
    public function index(): Response
    {
        $selectedAircraft = Aircraft::with(['aircraftType', 'aircraftType.manufacturer'])
            ->where('user_id', Auth::user()->id)
            ->first();

        $airport = Airport::where('identifier', Auth::user()->current_airport_id)->first();

        $contracts = Contract::with('arrAirport')
            ->where('current_airport_id', Auth::user()->current_airport_id)
            ->where('is_available', false)
            ->get();
        return Inertia::render('Dispatch', ['aircraft' => $selectedAircraft, 'contracts' => $contracts, 'airport' => $airport]);
    }
}
