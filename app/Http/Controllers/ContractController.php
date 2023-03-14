<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use App\Models\Contract;
use App\Services\Contracts\GetAirportsForContractGeneration;
use App\Services\Contracts\GetNumberOfContractsToGenerate;
use App\Services\Contracts\StartContractGenerationProcess;
use App\Services\Contracts\StoreContracts;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    public function index($icao, GetNumberOfContractsToGenerate $getNumberOfContractsToGenerate, GetAirportsForContractGeneration $getAirportsForContractGeneration, StartContractGenerationProcess $generationProcess, StoreContracts $storeContracts): Response|\Illuminate\Http\RedirectResponse
    {
        if ($icao == null) {
            $icao = Auth::user()->current_airport_id;
        }
        try {
            // get airport info
            $airport = Airport::where('identifier', $icao)->firstOrFail();

            // generate contracts for airport
            $contracts = $this->getContracts($icao);
            $numberToGenerate = $getNumberOfContractsToGenerate->execute($contracts->count(), $airport->size, $airport->is_hub);
            if ($numberToGenerate > 0) {
                // get airports
                $allAirports = $getAirportsForContractGeneration->execute($airport);
                if ($allAirports->count() > 0) {
                    // call generation
                    $newContracts = $generationProcess->execute($airport, $allAirports, $numberToGenerate);
                    // store generated
                    $storeContracts->execute($newContracts);
                }
                $contracts = $this->getContracts($icao);
            }

            // get aircraft
            return Inertia::render('Airports/Airport', ['airport' => $airport, 'contracts' => $contracts]);
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with(['error' => 'Airport not found']);
        }
    }

    protected function getContracts(string $icao): \Illuminate\Database\Eloquent\Collection|array
    {
        return Contract::with(['depAirport', 'currentAirport', 'arrAirport'])
            ->where('dep_airport_id', $icao)
            ->where('is_available', true)
            ->whereRaw('expires_at >= Now()')
            ->orderBy('distance')
            ->get();
    }
}
