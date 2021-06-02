<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'amount',
        'payment_status',
        'etc',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
