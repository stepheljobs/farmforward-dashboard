<?php

namespace App\Http\Controllers;

use App\Models\CropArrival;
use App\Models\Farmer;
use App\Models\CropType;
use App\Models\Farm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CropArrivalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cropArrivals = CropArrival::with(['farmer', 'field', 'cropType'])
            ->latest()
            ->paginate(10);

        return Inertia::render('crop-arrivals/Index', [
            'cropArrivals' => $cropArrivals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $farmers = Farmer::select('id', 'first_name', 'last_name')->get();
        $cropTypes = CropType::where('is_active', true)->get();
        $fields = Farm::select('id', 'name')->get();

        return Inertia::render('crop-arrivals/Create', [
            'farmers' => $farmers,
            'cropTypes' => $cropTypes,
            'fields' => $fields
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'stub_no' => 'required|string|max:255',
            'received_date' => 'required|date',
            'farmer_id' => 'required|exists:farmers,id',
            'field_id' => 'required|exists:farms,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'quantity_good' => 'required|numeric|min:0',
            'quantity_semi' => 'required|numeric|min:0',
            'quantity_reject' => 'required|numeric|min:0',
            'receipt_id' => 'nullable|string|max:255',
            'receipt_name' => 'nullable|string|max:255',
        ]);

        $cropArrival = CropArrival::create($validated);

        return redirect()->route('crop-arrivals.show', $cropArrival)
            ->with('success', 'Crop arrival recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CropArrival $cropArrival)
    {
        $cropArrival->load(['farmer', 'field', 'cropType']);

        return Inertia::render('crop-arrivals/Show', [
            'cropArrival' => $cropArrival
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CropArrival $cropArrival)
    {
        $farmers = Farmer::select('id', 'first_name', 'last_name')->get();
        $cropTypes = CropType::where('is_active', true)->get();
        $fields = Farm::select('id', 'name')->get();

        return Inertia::render('crop-arrivals/Edit', [
            'cropArrival' => $cropArrival,
            'farmers' => $farmers,
            'cropTypes' => $cropTypes,
            'fields' => $fields
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CropArrival $cropArrival)
    {
        $validated = $request->validate([
            'stub_no' => 'required|string|max:255',
            'received_date' => 'required|date',
            'farmer_id' => 'required|exists:farmers,id',
            'field_id' => 'required|exists:farms,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'quantity_good' => 'required|numeric|min:0',
            'quantity_semi' => 'required|numeric|min:0',
            'quantity_reject' => 'required|numeric|min:0',
            'receipt_id' => 'nullable|string|max:255',
            'receipt_name' => 'nullable|string|max:255',
        ]);

        $cropArrival->update($validated);

        return redirect()->route('crop-arrivals.show', $cropArrival)
            ->with('success', 'Crop arrival updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropArrival $cropArrival)
    {
        $cropArrival->delete();

        return redirect()->route('crop-arrivals.index')
            ->with('success', 'Crop arrival deleted successfully.');
    }
} 