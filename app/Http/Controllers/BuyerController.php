<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BuyerController extends Controller
{
    /**
     * Display a listing of the buyers.
     */
    public function index()
    {
        $buyers = Buyer::all();
        return inertia('Buyers/Index', [
            'buyers' => $buyers
        ]);
    }

    /**
     * Show the form for creating a new buyer.
     */
    public function create()
    {
        return inertia('Buyers/Create');
    }

    /**
     * Store a newly created buyer in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), Buyer::validationRules());

        if ($validator->fails()) {
            return redirect()->route('buyers.create')
                ->withErrors($validator)
                ->withInput();
        }

        Buyer::create($validator->validated());

        return redirect()->route('buyers.index')
            ->with('success', 'Buyer created successfully.');
    }

    /**
     * Display the specified buyer.
     */
    public function show(Buyer $buyer)
    {
        return inertia('Buyers/Show', [
            'buyer' => $buyer
        ]);
    }

    /**
     * Show the form for editing the specified buyer.
     */
    public function edit(Buyer $buyer)
    {
        return inertia('Buyers/Edit', [
            'buyer' => $buyer
        ]);
    }

    /**
     * Update the specified buyer in storage.
     */
    public function update(Request $request, Buyer $buyer)
    {
        $rules = Buyer::validationRules();
        // Modify the unique rule for buyer_id to ignore the current buyer
        $rules['buyer_id'] = 'required|string|max:255|unique:buyers,buyer_id,' . $buyer->id;

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->route('buyers.edit', $buyer->id)
                ->withErrors($validator)
                ->withInput();
        }

        $buyer->update($validator->validated());

        return redirect()->route('buyers.index')
            ->with('success', 'Buyer updated successfully.');
    }

    /**
     * Remove the specified buyer from storage.
     */
    public function destroy(Buyer $buyer)
    {
        $buyer->delete();

        return redirect()->route('buyers.index')
            ->with('success', 'Buyer deleted successfully.');
    }

    /**
     * Export buyers data as CSV
     */
    public function export()
    {
        $buyers = Buyer::all();
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="buyers.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];
        
        $callback = function() use ($buyers) {
            $file = fopen('php://output', 'w');
            
            // Add headers
            fputcsv($file, ['ID', 'Name', 'Buyer ID', 'Phone Number', 'Address', 'Status', 'Destination', 'Created At', 'Updated At']);
            
            // Add rows
            foreach ($buyers as $buyer) {
                fputcsv($file, [
                    $buyer->id,
                    $buyer->name,
                    $buyer->buyer_id,
                    $buyer->phone_number,
                    $buyer->address,
                    $buyer->status,
                    $buyer->destination,
                    $buyer->created_at,
                    $buyer->updated_at
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }
} 