<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Request;
use Illuminate\Support\Facades\Password;

class AuthController extends  Controller
{
    public function register(Request $request)

    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|uniqe:users,email',
            'password' => [
                'required',
                'conirmed',
                Password::min(8)->mixeCase()->numbers()->symbols()
            ]
        ]);
        /** @var \App\Models\User $user */
        $user = User::create([
           'name' => $data['name'],
           'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response ([
          'user' => $user,
          'token' => $token
        ]);
    }

}
