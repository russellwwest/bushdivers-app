<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contract>
 */
class ContractFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dep_airport_id' => 'AYMR',
            'arr_airport_id' => 'AYKK',
            'current_airport_id' => 'AYMR',
            'distance' => 88,
            'heading' => 130,
            'cargo_type' => 2,
            'cargo' => 'PAX',
            'cargo_qty' => 3,
            'contract_value' => 1028.00,
            'cargo_available' => 3,
            'expires_at' => Carbon::now()->addDay()
        ];
    }
}
