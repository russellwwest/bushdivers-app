<?php

namespace Tests\Unit\Models;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTruncation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic unit test example.
     */
    public function test__pilot_id_returned(): void
    {
        $user = User::create(['name' => 'John', 'email' => 'john@doe.com', 'password' => 'password']);
        $this->assertEquals('BDV0001', $user->pilot_id);
    }
}
