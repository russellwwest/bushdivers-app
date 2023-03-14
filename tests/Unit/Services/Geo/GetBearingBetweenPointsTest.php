<?php

namespace Tests\Unit\Services\Geo;

use App\Services\Geo\GetBearingBetweenPoints;
use PHPUnit\Framework\TestCase;

class GetBearingBetweenPointsTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_correct_distance_is_returned(): void
    {
        $getDistanceBetweenPoints = new GetBearingBetweenPoints();
        $start = ['lat' => -6.36188, 'lon' => 143.23070]; // AYMR
        $end = ['lat' => -6.14617, 'lon' =>  143.65733]; // AYMN
        $variance = 5.34502;
        $bearing = $getDistanceBetweenPoints->execute($start, $end, $variance);
        $this->assertEquals(57, $bearing);
    }

    public function test_correct_long_distance_north_is_returned(): void
    {
        $getDistanceBetweenPoints = new GetBearingBetweenPoints();
        $start = ['lat' => -6.36188, 'lon' => 143.23070]; // AYMR
        $end = ['lat' => 52.24166, 'lon' =>  -2.88111]; // EGBS
        $variance = -2.72951;
        $bearing = $getDistanceBetweenPoints->execute($start, $end, $variance);
        $this->assertEquals(337, $bearing);
    }

    public function test_correct_long_distance_west_is_returned(): void
    {
        $getDistanceBetweenPoints = new GetBearingBetweenPoints();
        $start = ['lat' => 52.24166, 'lon' =>  -2.88111]; // EGBS
        $end = ['lat' => 33.94247, 'lon' =>  -118.40932]; // KLAX
        $variance = 12.84990;
        $bearing = $getDistanceBetweenPoints->execute($start, $end, $variance);
        $this->assertEquals(297, $bearing);
    }

    public function test_correct_long_distance_south_is_returned(): void
    {
        $getDistanceBetweenPoints = new GetBearingBetweenPoints();
        $start = ['lat' => 52.24166, 'lon' =>  -2.88111]; // EGBS
        $end = ['lat' => -33.97137, 'lon' =>  18.60429]; // FACT
        $variance = -24.53024;
        $bearing = $getDistanceBetweenPoints->execute($start, $end, $variance);
        $this->assertEquals(186, $bearing);
    }
}
