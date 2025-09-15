<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoryController::class);

Route::apiResource('products', ProductController::class);
Route::get('/admin/products', [ProductController::class, 'adminIndex']);
Route::get('products/category/{categoryId}', [ProductController::class, 'getByCategory']);
Route::get('products/search/{query}', [ProductController::class, 'search']);
Route::get('products/slug/{slug}', [ProductController::class, 'getBySlug']);
Route::get('products/category/slug/{slug}', [ProductController::class, 'getByCategorySlug']);

Route::get('product-images/{product_id}', [ProductImageController::class, 'index']);
Route::post('product-images', [ProductImageController::class, 'store']);
Route::delete('product-images/{id}', [ProductImageController::class, 'destroy']);
Route::put('product-images/{id}', [ProductImageController::class, 'update']);

Route::get('/carts/{user_id}', [CartController::class, 'show']);
Route::post('/carts', [CartController::class, 'store']);
Route::delete('/carts/{id}', [CartController::class, 'destroy']);

Route::post('/cart-items', [CartItemController::class, 'store']);
Route::put('/cart-items/{id}', [CartItemController::class, 'update']);
Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('addresses', AddressController::class);
    Route::post('addresses/{id}/default', [AddressController::class, 'setDefault']);

    // Orders REST API
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/checkout-cart', [OrderController::class, 'checkoutCart']);
    Route::post('/orders/buy-now', [OrderController::class, 'buyNow']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/order-items', [OrderItemController::class, 'index']);
    Route::get('/order-items/{id}', [OrderItemController::class, 'show']);
    Route::put('/order-items/{id}', [OrderItemController::class, 'update']);
    Route::delete('/order-items/{id}', [OrderItemController::class, 'destroy']);
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
    Route::get('/admin/orders/{id}', [OrderController::class, 'adminShow']);
    Route::put('/admin/orders/{id}', [OrderController::class, 'adminUpdate']);
    
});

Route::middleware('auth:sanctum')->put('/user/profile', [ProfileController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/user/profile', [ProfileController::class, 'destroy']);

include 'auth.php';
