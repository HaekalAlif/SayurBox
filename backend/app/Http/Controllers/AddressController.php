<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    // GET /api/addresses
    public function index()
    {
        $addresses = Address::where('user_id', Auth::id())->get();
        return response()->json($addresses);
    }

    // POST /api/addresses
    public function store(Request $request)
    {
        $request->validate([
            'full_address' => 'required|string',
            'recipient_name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'notes' => 'nullable|string',
            'address_label' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        $address = Address::create([
            'user_id' => Auth::id(),
            'full_address' => $request->full_address,
            'recipient_name' => $request->recipient_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'notes' => $request->notes,
            'address_label' => $request->address_label,
            'is_default' => $request->is_default ?? false,
        ]);

        return response()->json($address, 201);
    }

    // GET /api/addresses/{id}
    public function show($id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($address);
    }

    // PUT /api/addresses/{id}
    public function update(Request $request, $id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'full_address' => 'required|string',
            'recipient_name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'notes' => 'nullable|string',
            'address_label' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        $address->update($request->all());

        return response()->json($address);
    }

    // DELETE /api/addresses/{id}
    public function destroy($id)
    {
        $address = Address::where('user_id', Auth::id())->findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Address deleted']);
    }

    // POST /api/addresses/{id}/default
    public function setDefault($id)
    {
        $userId = Auth::id();

        Address::where('user_id', $userId)->update(['is_default' => false]);

        $address = Address::where('user_id', $userId)->findOrFail($id);
        $address->is_default = true;
        $address->save();

        return response()->json(['message' => 'Alamat default berhasil diubah', 'address' => $address]);
    }
}