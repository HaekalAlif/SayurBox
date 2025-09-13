<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    // GET /api/products
    public function index(Request $request)
    {
        // Hanya tampilkan produk yang availability-nya bukan "sold"
        $products = Product::with(['category', 'images'])
            ->where('availability', '!=', 'sold')
            ->get();
        return response()->json($products);
    }

    // GET /api/admin/products
    public function adminIndex(Request $request)
    {
        // Ambil semua produk tanpa filter apapun
        $products = Product::with(['category', 'images'])->get();
        return response()->json($products);
    }

    // POST /api/products
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'short_description' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'required|numeric|min:0',
            'discount_percent' => 'nullable|integer|min:0|max:100',
            'availability' => 'required|string',
            'stock' => 'required|integer|min:0',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'unit' => 'required|string',
        ]);

        // Generate slug dari nama produk
        $slug = Str::slug($request->name);
        $originalSlug = $slug;
        $count = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        // Buat product dengan kolom stock
        $product = Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => $slug,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'price' => $request->price,
            'original_price' => $request->original_price,
            'discount_percent' => $request->discount_percent,
            'availability' => $request->availability,
            'stock' => $request->stock,
            'unit' => $request->unit,
        ]);

        // Handle multiple image upload
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $idx => $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('products', $imageName, 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                    'is_primary' => $idx === 0, // Jadikan gambar pertama sebagai primary
                ]);
            }
        }

        return response()->json($product->load('images'), 201);
    }

    // GET /api/products/{id}
    public function show($id)
    {
        $product = Product::with(['category', 'images'])->findOrFail($id);
        return response()->json($product);
    }

    // PUT /api/products/{id}
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:0',
            'original_price' => 'sometimes|required|numeric|min:0',
            'discount_percent' => 'nullable|integer|min:0|max:100',
            'availability' => 'sometimes|required|string',
            'stock' => 'sometimes|required|integer|min:0',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'unit' => 'sometimes|required|string',
        ]);

        // Jika nama berubah, update slug
        if ($request->has('name') && $request->name !== $product->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $count = 1;
            while (Product::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $originalSlug . '-' . $count;
                $count++;
            }
            $product->slug = $slug;
        }

        // Update properti lainnya
        $product->category_id = $request->category_id ?? $product->category_id;
        $product->name = $request->name ?? $product->name;
        $product->short_description = $request->short_description ?? $product->short_description;
        $product->description = $request->description ?? $product->description;
        $product->price = $request->price ?? $product->price;
        $product->original_price = $request->original_price ?? $product->original_price;
        $product->discount_percent = $request->discount_percent ?? $product->discount_percent;
        $product->availability = $request->availability ?? $product->availability;
        $product->stock = $request->stock ?? $product->stock;
        $product->unit = $request->unit ?? $product->unit;
        $product->save();

        // Handle new images (append, not replace)
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('products', $imageName, 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                    'is_primary' => false,
                ]);
            }
        }

        return response()->json($product->load('images'));
    }

    // DELETE /api/products/{id}
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Hapus semua gambar terkait
        foreach ($product->images as $img) {
            if ($img->image_url && Storage::disk('public')->exists($img->image_url)) {
                Storage::disk('public')->delete($img->image_url);
            }
            $img->delete();
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }

    // GET /api/products/category/{categoryId}
    public function getByCategory($categoryId)
    {
        $products = Product::where('category_id', $categoryId)
            ->with(['category', 'images'])
            ->get();

        return response()->json($products);
    }

    // GET /api/products/search/{query}
    public function search($query)
    {
        $products = Product::where('name', 'like', "%{$query}%")
            ->orWhere('short_description', 'like', "%{$query}%")
            ->with(['category', 'images'])
            ->get();

        return response()->json($products);
    }

    // GET /api/products/slug/{slug}
    public function getBySlug($slug)
    {
        $product = Product::where('slug', $slug)
            ->with(['category', 'images'])
            ->firstOrFail();

        return response()->json($product);
    }

    // GET /api/products/category/slug/{slug}
    public function getByCategorySlug($slug)
    {
        $category = \App\Models\Category::where('slug', $slug)->firstOrFail();
        $products = Product::where('category_id', $category->id)
            ->with(['category', 'images'])
            ->get();
        return response()->json($products);
    }
}