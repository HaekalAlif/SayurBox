<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            "New Product",
            "Sayur",
            "Buah",
            "Protein",
            "Sembako",
            "Bumbu Dapur",
            "Susu & Olahan",
            "Ibu & Bayi",
            "Sarapan",
            "Makanan Ringan",
            "Minuman Ringan",
            "Siap Saji",
            "Kesehatan",
            "Perawatan Diri",
            "Perawatan Rumah",
            "Perlengkapan Hewan",
            "21+ Category"
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
                'slug' => Str::slug($category),
            ]);
        }
    }
}