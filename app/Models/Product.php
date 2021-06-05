<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'en_name',
        'ar_name',
        'en_description',
        'ar_description',
        'tax',
        'price',
        'old_price',
        'rating',
        'discount_price',
        'recommended',
        'active',
        'image',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function department(){
        return $this->belongsTo('App\Models\Department');
    }
}
