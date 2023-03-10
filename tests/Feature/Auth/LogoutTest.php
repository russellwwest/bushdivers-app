<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_logout_responds_correctly(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/logout')
            ->assertStatus(Response::HTTP_FOUND);
    }
}
