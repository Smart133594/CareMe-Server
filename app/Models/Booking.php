<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_id',
        'delivery',
        'service_id',
        'date',
        'times',
        'quantity',
        'amount',
        'worker_id',
        'company',
        'insurance',
        'coupon_id',
        'payment',
        'type',
        'state',
        'reason',
        'image',
        'image1',
        'invoice'
    ];


    protected $casts = [
        'times'=>'array',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
