<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    // GET /api/product-images/{product_id}
    public function index($product_id)
    {
        $images = ProductImage::where('product_id', $product_id)->get();
        return response()->json($images);
    }

    // POST /api/product-images
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_primary' => 'nullable|boolean',
        ]);

        $image = $request->file('image');
        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('products', $imageName, 'public');

        $productImage = ProductImage::create([
            'product_id' => $request->product_id,
            'image_url' => $path,
            'is_primary' => $request->is_primary ?? false,
        ]);

        return response()->json($productImage, 201);
    }

    // DELETE /api/product-images/{id}
    public function destroy($id)
    {
        $image = ProductImage::findOrFail($id);
        if ($image->image_url && Storage::disk('public')->exists($image->image_url)) {
            Storage::disk('public')->delete($image->image_url);
        }
        $image->delete();

        return response()->json(['message' => 'Image deleted']);
    }

    // PUT /api/product-images/{id}
    public function update(Request $request, $id)
    {
        $image = ProductImage::findOrFail($id);

        $request->validate([
            'is_primary' => 'nullable|boolean',
        ]);

        if ($request->has('is_primary')) {
            $image->is_primary = $request->is_primary;
        }

        $image->save();

        return response()->json($image);
    }
}