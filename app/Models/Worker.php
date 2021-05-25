<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'first_name',
        'last_name',
        'address',
        'image',
        'servicies',
        'active',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts=[
        'servicies'=>'array',
    ];

    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
