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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('rank_id')->default(1);
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('current_airport_id')->default('AYMR');
            $table->integer('flights')->default(0);
            $table->integer('flight_time_mins')->default(0);
            $table->integer('points')->default(0);
            $table->decimal('cash', 16, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_admin')->default(false);
            $table->string('msfs')->nullable();
            $table->string('volanta')->nullable();
            $table->string('discord')->nullable();
            $table->string('api_token')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
