<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartItemController extends Controller
{
    // POST /api/cart-items
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cart_id' => 'required|exists:carts,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $existing = CartItem::where('cart_id', $request->cart_id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Produk sudah ada di keranjang!',
                'cart_item' => $existing
            ], 409); // Use 409 Conflict for existing resource
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

        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $product = $cartItem->product;

        // Pastikan kuantitas tidak melebihi stok
        if ($request->quantity > $product->stock) {
            return response()->json(['message' => 'Kuantitas melebihi stok yang tersedia.'], 422);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->subtotal = $product->price * $request->quantity;
        $cartItem->save();

        return response()->json($cartItem);
    }

    // DELETE /api/cart-items/{id}
    public function destroy($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Cart item deleted']);
        }
        return response()->json(['message' => 'Item not found'], 404);
    }
}