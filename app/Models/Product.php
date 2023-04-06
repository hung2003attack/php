<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model
{

    public function getProductAll()
    {
        $result = DB::table('products')->get();;
        return $result;
    }
    public function getProductType($request)
    {
        $result = DB::table('products')->where('type', '=', $request->typeProduct)->get();
        return $result;
    }
    public function getProductOne($request)
    {
        $result = DB::table('products')->where('id', '=', $request->id)->first();
        return $result;
    }
    public function getCart($request)
    {
        $result = DB::table('cart')->where('idUser', '=', $request->idUser)->get();
        return $result;
    }
    public function addCart($request)
    {
        $result = DB::table('cart')->insert([
            'idProduct' => $request->id,
            'name' => $request->name,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'idUser' => $request->idUser,
        ]);
        return $result;
    }
    public function checkCart($request)
    {
        $result = DB::table('cart')->where('idProduct', '=', $request->id)->where('idUser', '=', $request->idUser)->first();
        return $result;
    }
    public function deleteCart($request)
    {
        $result = DB::table('cart')->where('idProduct', '=', $request->idProduct)->where('idUser', '=', $request->idUser)->delete();
        // $result->delete();
        return $result;
    }
    public function updateCart($request)
    {
        $price = DB::table('products')->where('id', '=', $request->id)->first(['products.currentPrice']);
        $quantity = DB::table('cart')->where('idProduct', '=', $request->id)->where('idUser', '=', $request->idUser)->first(['cart.quantity']);
        $resultQ = DB::table('cart')->where('idProduct', '=', $request->id)->where('idUser', '=', $request->idUser)->update(['quantity' => $request->type == '+' ? $request->quantity + $quantity->quantity : ($quantity->quantity > 1 ? $quantity->quantity - 1 : 1)]);
        $quantity2 = DB::table('cart')->where('idProduct', '=', $request->id)->where('idUser', '=', $request->idUser)->first(['cart.quantity']);

        $resultP = DB::table('cart')->where('idProduct', '=', $request->id)->where('idUser', '=', $request->idUser)->update(['price' => $price->currentPrice * $quantity2->quantity]);
        $result = DB::table('cart')->where('idProduct', '=', $request->id)->where('idUser', '=', $request->idUser)->first(['cart.quantity', 'cart.price', 'cart.idProduct']);

        return $result;
    }
    public function addProduct($request)
    {
        $request->validate(['image' => 'required|mimes:jpg,png,jpeg,webp|max:5000']);
        $file = $request->image;
        $image =  $file->getClientOriginalName();
        $file->move(public_path('assets/upLoad'), $image);

        $result =  DB::table('products')->insert([
            'name' => $request->name,
            'priceBefore' => $request->priceBefore,
            'currentPrice' => $request->currentPrice,
            'type' => $request->type,
            'image' => $image,
            'inventoryNumber' => $request->inventory,
            'sale' => $request->sale,
            'description' => $request->description
        ]);
        return $result;
    }
    public function upDateProduct($request)
    {
        if (!empty($request->image)) {
            $request->validate(['image' => 'required|mimes:jpg,png,jpeg,webp|max:5000']);
            $file = $request->image;
            $image =  $file->getClientOriginalName();
            $file->move(public_path('assets/upLoad'), $image);

            DB::table('products')->where('id', '=', $request->id)->update(['image' => $image]);
        }


        $resultP = DB::table('products')->where('id', '=', $request->id)->update(['name' => $request->name, 'currentPrice' => $request->currentPrice, 'priceBefore' => $request->priceBefore, 'type' => $request->type, 'description' => $request->description, 'inventoryNumber' => $request->inventory]);

        return $resultP;
    }
    public function deleteProducts($request)
    {

        $resultCart =  DB::table('cart')->where('idProduct', '=', $request->id)->delete();
        $resultP = DB::table('products')->delete($request->id);
        return $resultP;
    }
    public function searchProduct($request)
    {
        if ($request->value != '') {
            $result = DB::table('products')->where('name', 'like',  $request->value . '%')->get();
            return $result;
        }
    }
    public function contact($request)
    {
        $result = DB::table('contact')->insert([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'content' => $request->content
        ]);
        return $result;
    }
    public function infoBuyUser($request)
    {
        $result = DB::table('infoCustomerBuy')->insert([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->adress,
            'note' => $request->note,
            'idProduct' => $request->id,
            'price' => $request->price,
            'quantity' => $request->quantitySold
        ]);
        $id = DB::getPdo()->lastInsertId();
        $results = DB::table('infoCustomerBuy')->where('id', '=', $id)->first();
        for ($y = 0; $y < count(json_decode($results->quantity)); $y++) {
            $quan = DB::table('products')->where('id', '=', json_decode($results->quantity)[$y]->idProduct)->first();
            DB::table('products')->where('id', '=', json_decode($results->quantity)[$y]->idProduct)->update(['quantitySold' => $quan->quantitySold + json_decode($results->quantity)[$y]->quantity]);
        }
        return $result;
    }
    public function getInfoBuyUser()
    {
        $data = [];
        $rs = [];
        $result = DB::table('infoCustomerBuy')->get();
        for ($i = 0; $i < count($result); $i++) {

            for ($y = 0; $y < count(json_decode($result[$i]->idProduct)); $y++) {
                $r = DB::table('products')->where('id', '=', json_decode($result[$i]->idProduct)[$y])->first();
                array_push($data, $r);
            }
            $result[$i]->customer = $data;
            $data = [];
            array_push($rs, $result[$i]);
        }
        return $rs;
    }
    public function quantitySold($request)
    {
        $result = DB::table('products')->where('quantitySold', '>', 0)->orderBy('quantitySold', 'DESC')->get();
        return $result;
    }
}