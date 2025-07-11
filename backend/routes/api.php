<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Test API routes
Route::get('/test', [TestController::class, 'test']);
Route::get('/users', [TestController::class, 'getUsers']);
