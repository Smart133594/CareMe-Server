<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ordering extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_id',
        'delivery',
        'carts',
        'state',
        'reason',
        'invoice',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected $casts=[
        'carts'=>'array',
    ];

    public function transaction(){
        return $this->belongsTo('App\Models\Transaction');
    }
}
