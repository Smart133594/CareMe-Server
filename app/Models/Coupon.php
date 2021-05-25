<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'percent',
        'type',
        'expire',
        'available',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
