<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Update the authenticated user's profile information.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'gender' => ['nullable', 'string', Rule::in(['male', 'female'])],
        ]);

       
        $user->name = $validatedData['name'];
        $user->phone = $validatedData['phone'];
        $user->birth_date = $validatedData['birth_date'];
        $user->gender = $validatedData['gender'];
        
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user->fresh(),
        ]);
    }

    /**
     * Delete the authenticated user's account.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();

        // Invalidate all tokens for this user before deleting
        $user->tokens()->delete();
        
        $user->delete();

        return response()->json(['message' => 'Account deleted successfully.']);
    }
}