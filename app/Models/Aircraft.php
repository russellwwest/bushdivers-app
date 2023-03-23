<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aircraft extends Model
{
    use HasFactory;

    protected $appends = [
        'total_condition'
    ];

    public function engines()
    {
        return $this->hasMany(AircraftEngine::class);
    }

    public function aircraftType()
    {
        return $this->belongsTo(AircraftType::class);
    }

    public function getTotalConditionAttribute()
    {
        $engines = AircraftEngine::where('aircraft_id', $this->id)->get();
        $numEngines = $engines->count();
        $totalEngineWear = $engines->sum('condition');
        $total = $this->condition + $totalEngineWear;
        return round($total / ($numEngines + 1));
    }
}
