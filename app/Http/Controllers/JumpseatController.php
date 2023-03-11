<?php

namespace App\Http\Controllers;

use App\Enums\UserTransactionTypes;
use App\Http\Requests\Crew\JumpseatRequest;
use App\Models\Airport;
use App\Models\User;
use App\Models\UserAccountLedger;
use App\Services\Crew\CalcJumpseatCost;
use App\Services\Crew\UpdateUserLocation;
use App\Services\Finance\LogUserAccountEntry;
use App\Services\Geo\GetDistanceBetweenPoints;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class JumpseatController extends Controller
{
    public function index(): Response
    {
        $user = User::with('location')->find(Auth::user()->id);
        $spent = UserAccountLedger::where('user_id', Auth::user()->id)
            ->where('transaction_type', UserTransactionTypes::Jumpseat)
            ->sum('total');

        return Inertia::render('Crew/Jumpseat', ['user' => $user, 'spent' => abs($spent)]);
    }

    public function performJumpseat(JumpseatRequest $request, UpdateUserLocation $updateUserLocation, LogUserAccountEntry $logUserAccountEntry): RedirectResponse
    {
        if (Auth::user()->cash < $request->cost) {
            return redirect()->back()->with(['error' => 'Insufficient funds']);
        }
        $updateUserLocation->execute(Auth::user()->id, $request->destination);
        $logUserAccountEntry->execute(Auth::user()->id, UserTransactionTypes::Jumpseat, -$request->cost);

        return redirect()->back()->with(['success' => 'Jumpseat travel performed successfully']);
    }
    public function check($start, $end, GetDistanceBetweenPoints $getDistanceBetweenPoints, CalcJumpseatCost $calcJumpseatCost): JsonResponse
    {
        try {
            $startAirport = Airport::where('identifier', $start)->first();
            $endAirport = Airport::where('identifier', $end)->firstOrFail();

            $startCoordinates = ['lat' => $startAirport->lat, 'lon' => $startAirport->lon];
            $endCoordinates = ['lat' => $endAirport->lat, 'lon' => $endAirport->lon];

            $distance = $getDistanceBetweenPoints->execute($startCoordinates, $endCoordinates);
            $cost = $calcJumpseatCost->execute($distance);

            return response()->json(['airport' => $endAirport, 'distance' => $distance, 'cost' => $cost]);
        } catch (ModelNotFoundException $notFoundException) {
            return response()->json(['message' => 'Airport not found'], HttpResponse::HTTP_NOT_FOUND);
        }

    }
}
