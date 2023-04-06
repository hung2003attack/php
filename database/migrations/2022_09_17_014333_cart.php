<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Cart extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart', function (Blueprint $table) {
            $table->integer('idProduct')->unsigned();
            $table->integer('idUser')->unsigned();
            $table->string('name')->length(100);
            $table->string('price')->length(50);
            $table->string('quantity')->length(50);
           
            $table->timestamps();
        });
        Schema::table('cart', function ($table) {
            $table->foreign('idProduct')->references('id')->on('products');
            $table->foreign('idUser')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
