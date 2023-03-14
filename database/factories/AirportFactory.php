<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Airport>
 */
class AirportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'identifier' => 'AYMR',
            'name' => 'Moro',
            'size' => 3,
            'lat' => -6.36188,
            'lon' => 143.23070,
            'magnetic_variance' => 5.33706
        ];
    }
}
