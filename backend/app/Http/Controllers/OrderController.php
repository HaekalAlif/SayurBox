<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Endpoint: GET /api/admin/orders
    public function adminIndex()
    {
        // Ambil semua order, bisa tambahkan with relasi jika perlu
        $orders = Order::with(['items.product.images', 'user'])->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }


    // List all orders for authenticated user
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $orders = Order::with(['items.product.images'])->where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    // Show single order
    public function show(Request $request, $id)
    {
        $userId = $request->user()->id;
        $order = Order::with(['items.product.images'])->where('user_id', $userId)->findOrFail($id);
        return response()->json($order);
    }

    // Checkout from cart
    public function checkoutCart(Request $request)
    {
        $userId = $request->user()->id;
        $cart = Cart::where('user_id', $userId)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $cartItemIds = $request->input('cart_item_ids', []);
        if (empty($cartItemIds)) {
            return response()->json(['message' => 'Tidak ada item yang dipilih'], 400);
        }

        // Ambil hanya cart item yang di-checklist
        $cartItems = $cart->items()->with('product.images')->whereIn('id', $cartItemIds)->get();
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $totalAmount = $cartItems->sum(function ($item) {
            $price = $item->price ?? ($item->product ? $item->product->price : 0);
            return $price * $item->quantity;
        });
        $shippingFee = $request->input('shipping_fee', 0); // Ambil dari FE
        $finalAmount = $totalAmount + $shippingFee;

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $userId,
                'total_amount' => $totalAmount,
                'shipping_fee' => $shippingFee,
                'final_amount' => $finalAmount,
                'delivery_slot' => $request->delivery_slot ?? null,
                'payment_status' => 'PENDING',
                'order_status' => 'PENDING',
            ]);
            foreach ($cartItems as $item) {
                $price = $item->price ?? ($item->product ? $item->product->price : 0);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $price,
                    'subtotal' => $price * $item->quantity,
                ]);
            }
            // Hapus hanya item yang di-checklist dari cart
            $cart->items()->whereIn('id', $cartItemIds)->delete();
            DB::commit();
            // Pastikan product.images ikut di response
            return response()->json([
                'message' => 'Checkout berhasil',
                'order' => $order->load(['items.product.images'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Checkout gagal', 'error' => $e->getMessage()], 500);
        }
    }

    // Buy now (beli langsung, tanpa cart)
    public function buyNow(Request $request)
    {
        $userId = $request->user()->id;
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $product = \App\Models\Product::findOrFail($productId);
        $price = $product->price;
        $subtotal = $price * $quantity;
        $shippingFee = $request->input('shipping_fee', 0); // Ambil dari FE
        $finalAmount = $subtotal + $shippingFee;

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $userId,
                'total_amount' => $subtotal,
                'shipping_fee' => $shippingFee,
                'final_amount' => $finalAmount,
                'delivery_slot' => $request->delivery_slot ?? null,
                'payment_status' => 'PENDING',
                'order_status' => 'PENDING',
            ]);
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $productId,
                'quantity' => $quantity,
                'price' => $price,
                'subtotal' => $subtotal,
            ]);
            DB::commit();
            return response()->json([
                'message' => 'Pembelian berhasil',
                'order' => $order->load('items.product.images')
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Pembelian gagal', 'error' => $e->getMessage()], 500);
        }
    }

    // Update order status/payment status, shipping fee, final amount
    public function update(Request $request, $id)
    {
        $userId = $request->user()->id;
        $order = Order::where('user_id', $userId)->findOrFail($id);

        $order->fill($request->only([
            'payment_status',
            'order_status',
            'delivery_slot',
            'shipping_fee',
            'final_amount'
        ]));
        $order->save();

        return response()->json(['message' => 'Order updated', 'order' => $order->load(['items.product.images'])]);
    }

    // Delete order (optional, biasanya tidak dihapus, hanya di-cancel)
    public function destroy(Request $request, $id)
    {
        $userId = $request->user()->id;
        $order = Order::where('user_id', $userId)->findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted']);
    }
}