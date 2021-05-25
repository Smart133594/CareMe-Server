<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'en_name',
        'ar_name',
        'image',
        'active',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function vendors(){
        return $this->hasMany('App\Models\Vendor');
    }
}
