<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AircraftType extends Model
{
    use HasFactory;

    public function aircraft()
    {
        return $this->hasMany(Aircraft::class);
    }

    public function manufacturer()
    {
        return $this->belongsTo(AircraftManufacturer::class, 'aircraft_manufacturer_id', 'id');
    }
}
