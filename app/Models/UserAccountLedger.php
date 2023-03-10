<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAccountLedger extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_type',
        'total',
        'pirep_id'
    ];
}
