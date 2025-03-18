<?php

namespace App\Http\Controllers;

use App\Models\CropPlanner;
use App\Models\Farmer;
use App\Models\CropType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CropPlannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cropPlanners = CropPlanner::with(['farmer', 'consultant', 'cropType'])
            ->latest()
            ->paginate(10);

        return Inertia::render('crop-planners/Index', [
            'cropPlanners' => $cropPlanners
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $farmers = Farmer::select('id', 'first_name', 'last_name')->get();
        $cropTypes = CropType::where('is_active', true)->get();

        return Inertia::render('crop-planners/Create', [
            'farmers' => $farmers,
            'cropTypes' => $cropTypes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'farmer_id' => 'required|exists:farmers,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'planned_area_hectares' => 'required|numeric|min:0',
            'estimated_quantity' => 'required|numeric|min:0',
            'planned_planting_date' => 'required|date',
            'expected_harvest_date' => 'required|date|after:planned_planting_date',
            'consultant_notes' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'volume_inputs' => 'nullable|numeric|min:0',
            'volume_inputs_type' => 'nullable|in:can,plants,lata,kg,seeds,g',
            'contact_number' => 'nullable|string|max:20',
        ]);

        $validated['consultant_id'] = Auth::id();
        $validated['status'] = 'pending_farmer';
        $validated['consultant_requested_at'] = now();

        $cropPlanner = CropPlanner::create($validated);

        return redirect()->route('crop-planners.show', $cropPlanner)
            ->with('success', 'Crop plan created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CropPlanner $cropPlanner)
    {
        $cropPlanner->load(['farmer', 'consultant', 'cropType']);

        return Inertia::render('crop-planners/Show', [
            'cropPlanner' => $cropPlanner
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CropPlanner $cropPlanner)
    {
        $cropTypes = CropType::where('is_active', true)->get();

        return Inertia::render('crop-planners/Edit', [
            'cropPlanner' => $cropPlanner,
            'cropTypes' => $cropTypes
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CropPlanner $cropPlanner)
    {
        $validated = $request->validate([
            'crop_type_id' => 'required|exists:crop_types,id',
            'planned_area_hectares' => 'required|numeric|min:0',
            'estimated_quantity' => 'required|numeric|min:0',
            'planned_planting_date' => 'required|date',
            'expected_harvest_date' => 'required|date|after:planned_planting_date',
            'consultant_notes' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'variety' => 'nullable|string|max:255',
            'volume_inputs' => 'nullable|numeric|min:0',
            'volume_inputs_type' => 'nullable|in:can,plants,lata,kg,seeds,g',
            'contact_number' => 'nullable|string|max:20',
        ]);

        $cropPlanner->update($validated);

        return redirect()->route('crop-planners.show', $cropPlanner)
            ->with('success', 'Crop plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropPlanner $cropPlanner)
    {
        $cropPlanner->delete();

        return redirect()->route('crop-planners.index')
            ->with('success', 'Crop plan deleted successfully.');
    }

    /**
     * Update the status of the crop planner.
     */
    public function updateStatus(Request $request, CropPlanner $cropPlanner)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'farmer_notes' => 'nullable|string',
        ]);

        $validated['farmer_responded_at'] = now();
        $cropPlanner->update($validated);

        return redirect()->route('crop-planners.show', $cropPlanner)
            ->with('success', 'Crop plan status updated successfully.');
    }
} 