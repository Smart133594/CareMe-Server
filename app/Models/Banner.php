<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'start_date',
        'expire_date',
        'active',
        'creator',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
