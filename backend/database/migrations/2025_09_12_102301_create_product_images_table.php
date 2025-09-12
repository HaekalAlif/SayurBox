<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Remove image_url from products table if you want to fully migrate to images table
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('image_url');
        });

        // Create product_images table
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('image_url');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');

        // Add image_url back to products table if needed
        Schema::table('products', function (Blueprint $table) {
            $table->string('image_url');
        });
    }
};