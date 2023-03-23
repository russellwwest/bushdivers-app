<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/jumpseat/check/{start}/{end}', [\App\Http\Controllers\JumpseatController::class, 'check']);
Route::get('/metar/{icao}', [\App\Http\Controllers\AirportController::class, 'metar']);

Route::post('/contracts/accept', [\App\Http\Controllers\ContractController::class, 'toggleAcceptance']);
Route::post('/aircraft/rent', [\App\Http\Controllers\AircraftController::class, 'rentAircraft']);
