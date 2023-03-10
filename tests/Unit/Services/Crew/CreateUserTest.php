<?php

namespace Tests\Unit\Services\Crew;

use App\Services\Crew\CreateUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateUserTest extends TestCase
{
    use RefreshDatabase;
    protected CreateUser $createUser;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->createUser = app()->make(CreateUser::class);
    }

    /**
     * A basic unit test example.
     */
    public function test_user_is_created(): void
    {
        $this->createUser->execute('John Doe', 'john@doe.com', 'password');
        $this->assertDatabaseHas('users', [
            'email' => 'john@doe.com'
        ]);
    }

    public function test_user_id_is_returned(): void
    {
        $id = $this->createUser->execute('John Doe', 'john@doe.com', 'password');
        $this->assertIsInt($id);
    }
}
