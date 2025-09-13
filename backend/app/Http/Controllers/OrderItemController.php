<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class OrderItemController extends Controller
{
    // List all order items for user's orders
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $orderItems = OrderItem::whereHas('order', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->with('product')->orderBy('created_at', 'desc')->get();

        return response()->json($orderItems);
    }

    // Show single order item (only if belongs to user)
    public function show(Request $request, $id)
    {
        $userId = $request->user()->id;
        $orderItem = OrderItem::with('product')->where('id', $id)
            ->whereHas('order', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->firstOrFail();

        return response()->json($orderItem);
    }

    // Update order item (e.g. quantity, price, subtotal)
    public function update(Request $request, $id)
    {
        $userId = $request->user()->id;
        $orderItem = OrderItem::where('id', $id)
            ->whereHas('order', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->firstOrFail();

        $orderItem->fill($request->only(['quantity', 'price', 'subtotal']));
        $orderItem->save();

        return response()->json(['message' => 'Order item updated', 'order_item' => $orderItem]);
    }

    // Delete order item (optional, usually not allowed after checkout)
    public function destroy(Request $request, $id)
    {
        $userId = $request->user()->id;
        $orderItem = OrderItem::where('id', $id)
            ->whereHas('order', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->firstOrFail();

        $orderItem->delete();

        return response()->json(['message' => 'Order item deleted']);
    }
}