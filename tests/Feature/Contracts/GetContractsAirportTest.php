<?php

namespace Tests\Feature\Contracts;

use App\Models\Airport;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetContractsAirportTest extends TestCase
{
    use RefreshDatabase;
    protected Model $airportMoro;
    protected Model $airportMH;
    protected Model $user;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->airportMoro = Airport::factory()->create();
        $this->user = User::factory()->create();
    }

    /**
     * A basic feature test example.
     */
    public function test_airport_returned(): void
    {
        $response = $this->actingAs($this->user)->get('/airport/AYMR');
        $response->assertStatus(200);
        $response->assertSee(['name' => 'Moro']);
    }

    public function test_handles_returns_current_location_if_null(): void
    {
        $response = $this->actingAs($this->user)->get('/airport');
        $response->assertSee(['identifier' => $this->user->current_airport_id]);
    }

    public function test_handles_invalid_airport(): void
    {
        $response = $this->followingRedirects()->actingAs($this->user)->get('/airport/XXX');
        $response->assertStatus(200);
        $response->assertSee(['error' => 'Airport not found']);
    }
}
