<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // GET /api/carts/{user_id}
    public function show($user_id)
    {
        $cart = Cart::with('items.product.images')->where('user_id', $user_id)->first();
        return response()->json($cart);
    }

    // POST /api/carts
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $cart = Cart::firstOrCreate(['user_id' => $request->user_id]);
        return response()->json($cart, 201);
    }

    // DELETE /api/carts/{id}
    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->items()->delete();
        $cart->delete();
        return response()->json(['message' => 'Cart deleted']);
    }
}