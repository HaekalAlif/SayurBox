<?php

use Illuminate\Support\Facades\Route;

// Untuk development - redirect ke Vite dev server
if (app()->environment('local')) {
    Route::get('/{any}', function () {
        return redirect('http://localhost:3000');
    })->where('any', '.*');
} else {
    // Untuk production - serve React build
    Route::get('/{any}', function () {
        return view('spa');
    })->where('any', '.*');
}