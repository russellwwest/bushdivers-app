<?php

namespace Tests\Unit\Services\Crew;

use App\Services\Crew\CalcJumpseatCost;
use PHPUnit\Framework\TestCase;

class CalcJumpseatCostTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_cost_is_returned_successfully(): void
    {
        $calcCost = new CalcJumpseatCost();
        $cost = $calcCost->execute(28.57);
        $this->assertEquals(11.43, $cost);
    }
}
