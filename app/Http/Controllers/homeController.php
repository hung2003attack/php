<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class homeController extends Controller
{
    public function __construct()
    {
        $this->db = new Product();
    }


    public function getPost()
    {
        return view('index');
    }
    public function getProductAll()
    {
        $result = $this->db->getProductAll();
        return $result;
    }
    public function getProductType(Request $request)
    {
        $result = $this->db->getProductType($request);
        return $result;
    }
    public function getProductOne(Request $request)
    {
        $result = $this->db->getProductOne($request);
        return $result;
    }
    public function getCart(Request $request)
    {
        $result = $this->db->getCart($request);
        return $result;
    }
    public function addCart(Request $request)
    {
        $result = $this->db->addCart($request);
        return $result;
    }
    public function checkCart(Request $request)
    {
        $result = $this->db->checkCart($request);
        return $result;
    }
    public function deleteCart(Request $request)
    {
        $result = $this->db->deleteCart($request);
        return $result;
    }
    public function updateCart(Request $request)
    {
        $result = $this->db->updateCart($request);
        return $result;
    }
    public function addProduct(Request $request)
    {

        $result = $this->db->addProduct($request);
        return $result;
    }
    public function upDateProduct(Request $request)
    {

        $result = $this->db->upDateProduct($request);
        return $result;
    }
    public function deleteProducts(Request $request)
    {

        $result = $this->db->deleteProducts($request);
        return $result;
    }
    public function searchProduct(Request $request)
    {
        $result = $this->db->searchProduct($request);
        return $result;
    }
    public function contact(Request $request)
    {
        $result = $this->db->contact($request);
        return $result;
    }
    public function getInfoBuyUser()
    {
        $result = $this->db->getInfoBuyUser();
        return $result;
    }
    public function infoBuyUser(Request $request)
    {
        $result = $this->db->infoBuyUser($request);
        return $result;
    }
    public function quantitySold(Request $request)
    {
        $result = $this->db->quantitySold($request);
        return $result;
    }
}