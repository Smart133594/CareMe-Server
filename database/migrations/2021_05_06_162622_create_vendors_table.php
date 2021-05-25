<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->integer('city_id');
            $table->string('en_name');
            $table->string('ar_name');
            $table->string('en_address');
            $table->string('ar_address');
            $table->double('lat');
            $table->double('lng');
            $table->string('phone')->nullable();
            $table->double('rating');
            $table->boolean('recommended')->default(false);
            $table->boolean('active')->default(true);
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
        Schema::dropIfExists('vendors');
    }
}
