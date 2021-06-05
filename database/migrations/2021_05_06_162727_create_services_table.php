<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->integer('department_id');
            $table->string('en_name');
            $table->string('ar_name');
            $table->text('en_description')->nullable();
            $table->text('ar_description')->nullable();
            $table->boolean('multiple_bookings')->default(true);
            $table->date('starting_date');
            $table->date('ending_date');
            $table->time('starting_time');
            $table->time('ending_time');
            $table->double('buffering_time');
            $table->double('duration');
            $table->double('tax')->default(10);
            $table->double('price');
            $table->double('old_price');
            $table->double('discount_price');
            $table->double('rating');
            $table->boolean('recommended')->default(false);
            $table->string('image')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('auto_confirm')->default(false);
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
        Schema::dropIfExists('services');
    }
}
