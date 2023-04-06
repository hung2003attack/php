<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InformationCustemerBuy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('infoCustomerBuy', function (Blueprint $table) {
            $table->increments('id');
            $table->string('idProduct')->length(250);
            $table->string('name')->length(40);
            $table->integer('phone')->length(11);
            $table->string('address')->length(250);
            $table->string('note')->nullable();
            $table->float('price');
            $table->string('quantity')->length(250);
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('infoCustomerBuy');
    }
}