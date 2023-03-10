<?php

namespace App\Http\Controllers;

use App\Enums\AirlineTransactionTypes;
use App\Enums\UserTransactionTypes;
use App\Http\Requests\Auth\AuthenticateRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Crew\CreateUser;
use App\Services\Finance\LogAccountEntry;
use App\Services\Finance\LogUserAccountEntry;
use App\Services\Finance\UpdateUserBalance;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function authenticate(AuthenticateRequest $request): RedirectResponse
    {
        if (
            Auth::attempt([
                'email' => $request->email,
                'password' => $request->password,
                'is_active' => true
            ], $request->remember)
        ) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }
        return redirect()->back()->with([
            'error' => 'Invalid credentials.',
        ]);
    }

    public function showRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function register(RegisterRequest $request, CreateUser $createUser, LogAccountEntry $logAccountEntry, LogUserAccountEntry $logUserAccountEntry): RedirectResponse
    {
        $userId = $createUser->execute($request->name, $request->email, $request->password);
        $logAccountEntry->execute(AirlineTransactionTypes::GeneralExpenditure, -200.00,'Pilot Bonus: '.$userId);
        $logUserAccountEntry->execute($userId, UserTransactionTypes::Bonus, 200.00);

        return redirect('/login')->with(['success' => 'Registered successfully']);
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
