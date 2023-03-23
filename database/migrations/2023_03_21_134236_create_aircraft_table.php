<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('aircraft', function (Blueprint $table) {
            $table->id();
            $table->foreignId('aircraft_type_id');
            $table->string('current_airport_id');
            $table->string('registration')->unique();
            $table->decimal('fuel_onboard')->default(0.00);
            $table->integer('flight_time_mins')->default(0);
            $table->integer('state')->default(1);
            $table->foreignId('user_id')->nullable();
            $table->decimal('last_lat', 11, 5)->nullable();
            $table->decimal('last_lon', 11, 5)->nullable();
            $table->string('home_location')->nullable();
            $table->dateTime('last_flight')->nullable();
            $table->dateTime('last_inspected_at')->nullable();
            $table->bigInteger('owner_id')->nullable();
            $table->decimal('condition')->default(100.00);
            $table->decimal('sale_price', 12, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aircraft');
    }
};
