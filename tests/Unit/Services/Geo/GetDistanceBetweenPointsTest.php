<?php

namespace Tests\Unit\Services\Geo;

use App\Services\Geo\GetDistanceBetweenPoints;
use PHPUnit\Framework\TestCase;

class GetDistanceBetweenPointsTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_correct_distance_is_returned(): void
    {
        $getDistanceBetweenPoints = new GetDistanceBetweenPoints();
        $start = ['lat' => -6.36188, 'lon' => 143.23070]; // AYMR
        $end = ['lat' => -6.14617, 'lon' =>  143.65733]; // AYMN
        $distance = $getDistanceBetweenPoints->execute($start, $end, 'm');
        $this->assertEquals(52906.40, $distance);
    }

    public function test_correct_distance_is_returned_in_nm(): void
    {
        $getDistanceBetweenPoints = new GetDistanceBetweenPoints();
        $start = ['lat' => -6.36188, 'lon' => 143.23070]; // AYMR
        $end = ['lat' => -6.14617, 'lon' =>  143.65733]; // AYMN
        $distance = $getDistanceBetweenPoints->execute($start, $end);
        $this->assertEquals(28.57, $distance);
    }
}
