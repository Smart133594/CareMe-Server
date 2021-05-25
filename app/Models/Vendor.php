<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'city_id',
        'en_name',
        'ar_name',
        'en_address',
        'ar_address',
        'lat',
        'lng',
        'phone',
        'rating',
        'recommended',
        'active',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function category(){
        return $this->belongsTo('App\Models\Category');
    }

    public function images(){
        return $this->hasMany('App\Models\VendorGallery');
    }

    public function city(){
        return $this->belongsTo('App\Models\City');
    }

    public function departments(){
        return $this->hasMany('App\Models\Department');
    }

    public function holidays(){
        return $this->hasMany('App\Models\Holiday');
    }

    public function offday(){
        return $this->hasOne('App\Models\Offday');
    }
}
