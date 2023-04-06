<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Products extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->length(100);
            $table->string('type')->length(50);
            $table->integer('priceBefore')->length(20)->nullable(true);
            $table->integer('currentPrice')->length(20);
            $table->string('image')->length(10);
            $table->integer('inventoryNumber')->length(10);
            $table->integer('quantitySold')->length(10)->nullable(true);
            $table->string('sale')->length(50)->nullable(true);
            $table->integer('love')->length(20)->nullable(true);
            $table->integer('star')->length(5)->nullable(true);
            $table->text('description');
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
        //
    }
}