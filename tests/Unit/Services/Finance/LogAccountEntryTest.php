<?php

namespace Tests\Unit\Services\Finance;

use App\Enums\AirlineTransactionTypes;
use App\Services\Finance\LogAccountEntry;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LogAccountEntryTest extends TestCase
{
    use RefreshDatabase;
    protected LogAccountEntry $logAccountEntry;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->logAccountEntry = app()->make(LogAccountEntry::class);
    }

    /**
     * A basic unit test example.
     */
    public function test_positive_transaction_logged(): void
    {
        $this->logAccountEntry->execute(AirlineTransactionTypes::ContractIncome, 200.00);
        $this->assertDatabaseHas('account_ledgers', [
           'total' => 200.00,
           'transaction_type' => AirlineTransactionTypes::ContractIncome
        ]);
    }

    public function test_negative_transaction_logged(): void
    {
        $this->logAccountEntry->execute(AirlineTransactionTypes::ContractExpenditure, -200.00);
        $this->assertDatabaseHas('account_ledgers', [
            'total' => -200.00,
            'transaction_type' => AirlineTransactionTypes::ContractExpenditure
        ]);
    }
}
