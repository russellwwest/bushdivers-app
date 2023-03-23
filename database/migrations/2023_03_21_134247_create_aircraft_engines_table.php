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
        Schema::create('aircraft_engines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('aircraft_id');
            $table->integer('engine_no');
            $table->integer('mins_since_tbo')->default(0);
            $table->integer('mins_since_100hr')->default(0);
            $table->decimal('condition')->default(100.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aircraft_engines');
    }
};
