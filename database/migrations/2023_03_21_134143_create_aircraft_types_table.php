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
        Schema::create('aircraft_types', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->unique();
            $table->string('name');
            $table->string('aircraft_manufacturer_id');
            $table->integer('number_of_engines');
            $table->integer('fuel_type');
            $table->integer('zfw');
            $table->integer('mtow');
            $table->integer('cargo_capacity');
            $table->integer('pax_capacity');
            $table->integer('fuel_capacity');
            $table->integer('service_ceiling');
            $table->integer('range');
            $table->integer('cruise_speed');
            $table->integer('tbo_mins');
            $table->string('image')->nullable();
            $table->decimal('new_price', 12, 2)->nullable();
            $table->string('hq')->nullable();
            $table->boolean('is_bushdivers')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aircraft_types');
    }
};
