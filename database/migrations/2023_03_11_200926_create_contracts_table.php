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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('dep_airport_id', 5);
            $table->string('arr_airport_id', 5);
            $table->string('current_airport_id', 5);
            $table->decimal('distance');
            $table->integer('heading');
            $table->integer('cargo_type');
            $table->string('cargo');
            $table->integer('cargo_qty');
            $table->decimal('contract_value');
            $table->integer('cargo_available');
            $table->integer('cargo_qty_completed')->default(0);
            $table->boolean('is_available')->default(true);
            $table->boolean('is_completed')->default(false);
            $table->boolean('is_custom')->default(false);
            $table->bigInteger('user_id')->nullable();
            $table->dateTime('expires_at');
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
