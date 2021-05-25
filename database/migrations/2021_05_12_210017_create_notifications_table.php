<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('content')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('booking_id')->nullable();
            $table->integer('order_id')->nullable();
            $table->enum('type', array('new_booking', 'new_ordering', 'accepted_booking', 'rejected_booking'))->default('new_booking');
            $table->boolean('read_admin')->nullable();
            $table->boolean('read_receiver')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
