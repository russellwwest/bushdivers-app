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
        Schema::create('user_account_ledgers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->integer('transaction_type');
            $table->decimal('total', 16, 2);
            $table->uuid('pirep_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_account_ledgers');
    }
};
