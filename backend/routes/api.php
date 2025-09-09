<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('addresses', AddressController::class);
    Route::post('addresses/{id}/default', [AddressController::class, 'setDefault']);
});


include 'auth.php';
