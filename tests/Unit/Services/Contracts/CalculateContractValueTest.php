<?php

namespace Tests\Unit\Services\Contracts;

use App\Services\Contracts\CalculateContractValue;
use PHPUnit\Framework\TestCase;

class CalculateContractValueTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_contract_value_calculated_for_cargo(): void
    {
        $calcValue = new CalculateContractValue();
        $val = $calcValue->execute(1, 1000, 100, 1.00);
        $this->assertEquals(1460, $val);
    }

    public function test_contract_value_calculated_for_pax(): void
    {
        $calcValue = new CalculateContractValue();
        $val = $calcValue->execute(2, 5, 100, 1.00);
        $this->assertEquals(1260, $val);
    }

    public function test_contract_value_calculated_with_expiry(): void
    {
        $calcValue = new CalculateContractValue();
        $val = $calcValue->execute(2, 5, 100, 1.5);
        $this->assertEquals(1890, $val);
    }
}
