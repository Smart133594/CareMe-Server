<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_id',
        'product_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
