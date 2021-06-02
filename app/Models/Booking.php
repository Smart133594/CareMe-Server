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
        'worker_id',
        'company',
        'insurance',
        'coupon_id',
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

    public function transaction(){
        return $this->belongsTo('App\Models\Transaction');
    }
}
