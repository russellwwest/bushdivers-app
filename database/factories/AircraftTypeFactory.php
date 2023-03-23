<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AircraftType>
 */
class AircraftTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'identifier' => 'C208',
            'name' => 'Caravan',
            'aircraft_manufacturer_id' => 1,
            'number_of_engines' => 1,
            'fuel_type' => 2,
            'zfw' => 5000,
            'mtow' => 8000,
            'cargo_capacity' => 3500,
            'pax_capacity' => 10,
            'fuel_capacity' => 335,
            'service_ceiling' => 25000,
            'range' => 1100,
            'cruise_speed' => 180,
            'tbo_mins' => 216000,
            'is_bushdivers' => true
        ];
    }
}
