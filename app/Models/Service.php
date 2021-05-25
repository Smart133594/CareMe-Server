<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'en_name',
        'ar_name',
        'en_description',
        'ar_description',
        'multiple_bookings',
        'starting_date',
        'ending_date',
        'starting_time',
        'ending_time',
        'buffering_time',
        'duration',
        'tax',
        'price',
        'discount_price',
        'rating',
        'recommended',
        'active',
        'image',
        'auto_confirm'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function department(){
        return $this->belongsTo('App\Models\Department');
    }
}
