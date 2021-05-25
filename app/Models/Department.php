<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'en_name',
        'ar_name',
        'order',
        'active',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function servicies(){
        return $this->hasMany('App\Models\Service');
    }

    public function products(){
        return $this->hasMany('App\Models\Product');
    }

    public function vendor(){
        return $this->belongsTo('App\Models\Vendor');
    }
}
