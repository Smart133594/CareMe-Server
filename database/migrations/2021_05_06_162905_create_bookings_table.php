<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('transaction_id')->nullable();
            $table->boolean('delivery')->default(false);

            $table->integer('service_id')->nullable();
            $table->date('date')->nullable();
            $table->string('times')->nullable();
            $table->double('quantity')->nullable();
            $table->integer('worker_id')->nullable();

            $table->string('company')->nullable();
            $table->string('insurance')->nullable();
            $table->integer('coupon_id')->nullable();

            $table->enum('type', array('card', 'coupon', 'insurance'))->default('card');
            $table->enum('state', array('pending', 'confirmed', 'completed', 'rejected'))->default('pending');
            $table->string('reason')->nullable();
            $table->string('image')->nullable();
            $table->string('image1')->nullable();
            $table->string('invoice')->nullable();
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
        Schema::dropIfExists('bookings');
    }
}
