<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return \Inertia\Inertia::render('Home');
});

Route::get('/login', [\App\Http\Controllers\AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'authenticate']);
Route::get('/register', [\App\Http\Controllers\AuthController::class, 'showRegister']);
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\CrewController::class, 'index']);
    Route::get('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/jumpseat', [\App\Http\Controllers\JumpseatController::class, 'index']);
    Route::post('/jumpseat', [\App\Http\Controllers\JumpseatController::class, 'performJumpseat']);
});
