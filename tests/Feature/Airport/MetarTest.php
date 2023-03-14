<?php

namespace Tests\Feature\Airport;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class MetarTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_responds_successfully(): void
    {
        Http::fake(function (Request $request) {
            return Http::response(['data' => ['flight_category' => 'IFR'], 'results' => 1], 200);
        });
        $response = $this->getJson('/api/metar/AYMH');
        $response->assertStatus(200);
        $response->assertJsonFragment(['flight_category' => 'IFR']);
    }
}
