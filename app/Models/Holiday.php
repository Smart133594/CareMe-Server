<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'starting_date',
        'ending_date',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts=[

    ];

    public function vendor(){
        return $this->belongsTo('App\Models\Vendor');
    }
}
