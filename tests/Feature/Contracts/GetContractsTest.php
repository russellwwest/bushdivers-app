<?php

namespace Tests\Feature\Contracts;

use App\Models\Airport;
use App\Models\CargoTypes;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetContractsTest extends TestCase
{
    use RefreshDatabase;
    protected Model $aymr;
    protected Model $aymn;
    protected Model $aymh;
    protected Model $egbs;
    protected Model $egbj;
    protected Model $ayfo;
    protected Model $user;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->user = User::factory()->create();
        $this->aymr = Airport::factory()->create();
        $this->aymh = Airport::factory()->create([
            'identifier' => 'AYMH',
            'name' => 'Mount Hagen',
            'lat' => -5.82781,
            'lon' => 144.29953,
            'magnetic_variance' => 5.51567
        ]);
        $this->aymn = Airport::factory()->create([
            'identifier' => 'AYMN',
            'name' => 'Mendi',
            'lat' => -6.14617,
            'lon' => 143.65733,
            'magnetic_variance' => 5.34502
        ]);
        $this->egbs = Airport::factory()->create([
            'identifier' => 'EGBS',
            'name' => 'Shobdon',
            'lat' => 52.24166,
            'lon' => -2.88111,
            'magnetic_variance' => -2.72951
        ]);
        $this->egbj = Airport::factory()->create([
            'identifier' => 'EGBJ',
            'name' => 'Gloucester',
            'lat' => 51.89417,
            'lon' => -2.16722,
            'magnetic_variance' => -2.64494
        ]);
        $this->ayfo = Airport::factory()->create([
            'identifier' => 'AYFO',
            'name' => 'Fogomaiu Airstrip',
            'lat' => -6.50917,
            'lon' => 143.07904,
            'magnetic_variance' => 5.37523
        ]);
        CargoTypes::factory()->create([
            'cargo_type' => 1,
            'cargo_type_text' => 'Food stuffs'
        ]);
        CargoTypes::factory()->create([
            'cargo_type' => 1,
            'cargo_type_text' => 'Clothing'
        ]);
        CargoTypes::factory()->create([
            'cargo_type' => 2,
            'cargo_type_text' => 'Tourists'
        ]);
        CargoTypes::factory()->create([
            'cargo_type' => 2,
            'cargo_type_text' => 'Journalists'
        ]);
    }

    /**
     * A basic feature test example.
     */
    public function test_contracts_returned(): void
    {
        $response = $this->actingAs($this->user)->get('/airport/AYMR');
        $response->assertStatus(200);
        $response->assertSee(['contracts']);
    }
}