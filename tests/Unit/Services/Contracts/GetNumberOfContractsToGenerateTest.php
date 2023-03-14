<?php

namespace Tests\Unit\Services\Contracts;

use App\Services\Contracts\GetNumberOfContractsToGenerate;
use PHPUnit\Framework\TestCase;

class GetNumberOfContractsToGenerateTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_full_amount_for_hub_returned(): void
    {
        $getNumberOfContractsToGenerate = new GetNumberOfContractsToGenerate();
        $num = $getNumberOfContractsToGenerate->execute(0, 3, true);
        $this->assertEquals(25, $num);
    }

    public function test_full_amount_for_big_airport_returned(): void
    {
        $getNumberOfContractsToGenerate = new GetNumberOfContractsToGenerate();
        $num = $getNumberOfContractsToGenerate->execute(0, 3, false);
        $this->assertEquals(18, $num);
    }

    public function test_full_amount_for_small_airport_returned(): void
    {
        $getNumberOfContractsToGenerate = new GetNumberOfContractsToGenerate();
        $num = $getNumberOfContractsToGenerate->execute(0, 1, false);
        $this->assertEquals(9, $num);
    }

    public function test_amount_minus_contracts_returned(): void
    {
        $getNumberOfContractsToGenerate = new GetNumberOfContractsToGenerate();
        $num = $getNumberOfContractsToGenerate->execute(5, 1, false);
        $this->assertEquals(4, $num);
    }

    public function test_amount_returned_is_zero_when_enough_contracts_exist(): void
    {
        $getNumberOfContractsToGenerate = new GetNumberOfContractsToGenerate();
        $num = $getNumberOfContractsToGenerate->execute(20, 1, false);
        $this->assertEquals(0, $num);
    }
}
