<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orderings', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->string('transaction_id')->nullable();
            $table->boolean('delivery')->default(false);
            $table->text('carts')->nullable();
            $table->enum('payment', array('due', 'paid', 'refund'))->default('due');
            $table->double('amount')->default(0);
            $table->enum('type', array('card'))->default('card');
            $table->enum('state', array('pending', 'accepted', 'completed', 'rejected'))->default('pending');
            $table->string('reason')->nullable();
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
        Schema::dropIfExists('orderings');
    }
}
