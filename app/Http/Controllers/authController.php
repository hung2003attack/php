<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Register;
use App\Models\authModel;

class authController extends Controller
{

    private $db;
    public function __construct()
    {
        $this->db = new authModel();
    }
    public function admin()
    {
        return view('admin/login');
    }
    public function adminEdit()
    {
        return view('admin');
    }
    public function adminLogin(Request $request)
    {
        return  $this->db->adminLogin($request);
    }
    public function handleLogin()
    {
        return view('auth/login');
    }

    public function postLogin(Request $request)
    {

        $result = $this->db->login($request);
        if (gettype($result) == 'object') {
            $result->status = 200;
            return  $result;
        } else {
            return $result;
        }
    }
    public function handleRegister(Request $request)
    {
        return view('auth/register');
    }
    public function postRegister(Register  $request)
    {
        $result = $this->db->register($request);
        if ($result) {
            return redirect('auth/login');
        }
    }
}