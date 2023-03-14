<?php

namespace App\Services\Contracts;

use App\Models\CargoTypes;
use Illuminate\Support\Facades\DB;

class GenerateCargo
{
    public function execute(): array
    {
        $minCargo = 350;
        $maxCargo = 4000;
        $minPax = 1;
        $maxPax = 9;
        $types = CargoTypes::all();
        $cargo = $types->random();
        if ($cargo->type == 1) {
            // random qty cargo
            $qty = rand($minCargo, $maxCargo);
        } else {
            // random qty pax
            $qty = rand($minPax, $maxPax);
        }
        return ['name' => $cargo->cargo_type_text, 'type' => $cargo->cargo_type, 'qty' => $qty];
    }
}
