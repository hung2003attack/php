<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Register extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:6',
            'phone' => 'required|min:10|max:11',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'retypePassword' => 'required|same:password'
        ];
    }
    public function messages()
    {
        return [
            'required' => ':attribute can not be empty',
            'max' => ':attribute must be at max :max character',
            'min' => ':attribute must be at least :min character',
            'same' => ':attribute is not',
            'email' => ':attribute is not valid'

        ];
    }
}