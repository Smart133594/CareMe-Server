<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offday extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'off_days',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts=[
        'off_days'=>'array',
    ];

    public function vendor(){
        return $this->belongsTo('App\Models\Vendor');
    }
}
