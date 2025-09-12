<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    // POST /api/cart-items    
   public function store(Request $request)
    {
        $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Cek apakah item sudah ada di keranjang
        $existing = CartItem::where('cart_id', $request->cart_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existing) {
            // Status 200, bukan error, dan pesan jelas
            return response()->json([
                'message' => 'Produk sudah ada di keranjang!',
                'cart_item' => $existing
            ], 200);
        }

        $product = Product::findOrFail($request->product_id);
        $subtotal = $product->price * $request->quantity;

        $cartItem = CartItem::create([
            'cart_id' => $request->cart_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'subtotal' => $subtotal,
        ]);

        return response()->json($cartItem, 201);
    }

    // PUT /api/cart-items/{id}
    public function update(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = $cartItem->product;
        $cartItem->quantity = $request->quantity;
        $cartItem->subtotal = $product->price * $request->quantity;
        $cartItem->save();

        return response()->json($cartItem);
    }

    // DELETE /api/cart-items/{id}
    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();
        return response()->json(['message' => 'Cart item deleted']);
    }
}