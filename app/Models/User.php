<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name',
        'first_name',
        'last_name',
        'avatar',
        'gender',
        'birthday',
        'email',
        'email_verified_at',
        'phone',
        'phone_verified_at',
        'role',
        'fmc_token',
        'password',
        'active',
        'roles'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'roles'=>'array',
    ];

    public function workers(){
        return $this->hasMany('App\Models\Worker');
    }

    public function wishes(){
        return $this->hasMany('App\Models\WishList');
    }

    public function bookings(){
        return $this->hasMany('App\Models\Booking');
    }
}
