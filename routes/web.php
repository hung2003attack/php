<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\authController;
use App\Http\Controllers\homeController;



use App\Http\Middleware\LoginMiddleware;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(authController::class)->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get(
            '/login',
            'handleLogin'
        );
        Route::post(
            '/login',
            'postLogin'
        )->name('login');

        Route::get('/register', 'handleRegister');
        Route::post('/register', 'postRegister');
    });
    Route::prefix('admin')->group(function () {
        Route::get(
            '/login',
            'admin'
        );
        Route::post(
            '/login',
            'adminLogin'
        )->name('adminLogin');
    });
    Route::middleware([LoginMiddleware::class])->group(function () {
        Route::get('/adminEdit', 'adminEdit');
    });
});
Route::controller(homeController::class)->group(function () {

    Route::get('/', 'getPost')->name('getHome');
    Route::get('/getProductAll', 'getProductAll');
    Route::get('/getProductType', 'getProductType');
    Route::get('/getProductOne', 'getProductOne');
    Route::get('/getCart', 'getCart');
    Route::post('/addCart', 'addCart');
    Route::get('/checkCart', 'checkCart');
    Route::delete('/deleteCart', 'deleteCart');
    Route::patch('/updateCart', 'updateCart');
    Route::post('/addProduct', 'addProduct');
    Route::post('/upDateProduct', 'upDateProduct');
    Route::delete('/deleteProducts', 'deleteProducts');

    Route::get('/searchProduct', 'searchProduct');
    Route::post('/contact', 'contact');
    Route::get('/getInfoBuyUser', 'getInfoBuyUser');
    Route::get('/quantitySold', 'quantitySold');

    Route::post('/infoBuyUser', 'infoBuyUser')->name('info');
});