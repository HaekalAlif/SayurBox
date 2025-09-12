<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('addresses', AddressController::class);
    Route::post('addresses/{id}/default', [AddressController::class, 'setDefault']);
});

Route::apiResource('categories', CategoryController::class);

Route::apiResource('products', ProductController::class);
Route::get('products/category/{categoryId}', [ProductController::class, 'getByCategory']);
Route::get('products/search/{query}', [ProductController::class, 'search']);
Route::get('products/slug/{slug}', [ProductController::class, 'getBySlug']);
Route::get('products/category/slug/{slug}', [ProductController::class, 'getByCategorySlug']);

Route::get('product-images/{product_id}', [ProductImageController::class, 'index']);
Route::post('product-images', [ProductImageController::class, 'store']);
Route::delete('product-images/{id}', [ProductImageController::class, 'destroy']);
Route::put('product-images/{id}', [ProductImageController::class, 'update']);

include 'auth.php';
