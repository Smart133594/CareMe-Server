<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorGallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'image',
        'order',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function vendor(){
        return $this->belongsTo('App\Models\Vendor');
    }
}
