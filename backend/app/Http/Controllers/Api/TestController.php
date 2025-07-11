<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    /**
     * Test API connection
     */
    public function test(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Laravel-React integration is working!',
            'timestamp' => now()->toISOString(),
            'environment' => app()->environment(),
        ]);
    }

    /**
     * Get sample users data
     */
    public function getUsers(): JsonResponse
    {
        // Sample users data - replace with actual User model query if needed
        $users = [
            [
                'id' => 1,
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'created_at' => '2024-01-01T00:00:00Z'
            ],
            [
                'id' => 2,
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'created_at' => '2024-01-02T00:00:00Z'
            ],
            [
                'id' => 3,
                'name' => 'Bob Johnson',
                'email' => 'bob@example.com',
                'created_at' => '2024-01-03T00:00:00Z'
            ]
        ];

        return response()->json($users);
    }
}
