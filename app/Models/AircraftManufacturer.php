<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AircraftManufacturer extends Model
{
    use HasFactory;

    public function types()
    {
        return $this->hasMany(AircraftType::class);
    }
}
