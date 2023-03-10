<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_register_page_responds(): void
    {
        $response = $this->get('/register');
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_register_successfully(): void
    {
        $data = ['email' => 'john@doe.com', 'password' => 'password', 'name' => 'John Doe'];
        $this->followingRedirects()->post('/register', $data)
            ->assertStatus(Response::HTTP_OK);

    }

    public function test_register_fails_with_existing_email(): void
    {
        $user = User::factory()->create();
        $data = ['email' => $user->email, 'password' => 'password', 'name' => 'John Doe'];
        $this->followingRedirects()->post('/register', $data)
            ->assertSee('The email has already been taken');
    }
}
