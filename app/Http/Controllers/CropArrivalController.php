<?php

namespace App\Http\Controllers;

use App\Models\CropArrival;
use App\Models\Farmer;
use App\Models\CropType;
use App\Models\Farm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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
            'stub_no' => 'required|string|unique:crop_arrivals',
            'received_date' => 'required|date',
            'farmer_id' => 'required|exists:farmers,id',
            'field_id' => 'required|exists:farms,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'quantity_good' => 'required|numeric|min:0',
            'quantity_semi' => 'required|numeric|min:0',
            'quantity_reject' => 'required|numeric|min:0',
            'receipt_id' => 'required|string',
            'receipt_name' => 'required|string',
        ]);

        $cropArrival = CropArrival::create($validated);

        return response()->json($cropArrival, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CropArrival $cropArrival)
    {
        $cropArrival->load(['farmer', 'field', 'cropType']);
        return response()->json($cropArrival);
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
            'stub_no' => 'required|string|unique:crop_arrivals,stub_no,' . $cropArrival->id,
            'received_date' => 'required|date',
            'farmer_id' => 'required|exists:farmers,id',
            'field_id' => 'required|exists:farms,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'quantity_good' => 'required|numeric|min:0',
            'quantity_semi' => 'required|numeric|min:0',
            'quantity_reject' => 'required|numeric|min:0',
            'receipt_id' => 'required|string',
            'receipt_name' => 'required|string',
        ]);

        $cropArrival->update($validated);

        return response()->json($cropArrival);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropArrival $cropArrival)
    {
        $cropArrival->delete();
        return response()->json(null, 204);
    }
} 