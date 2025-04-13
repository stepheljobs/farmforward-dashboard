<?php

namespace App\Http\Controllers;

use App\Models\CropCommitment;
use App\Models\Farmer;
use App\Models\CropType;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CropCommitmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cropCommitments = CropCommitment::with(['farmer', 'cropType'])->get();

        return Inertia::render('crop-commitments/Index', [
            'cropCommitments' => $cropCommitments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'farmer_id' => 'required|exists:farmers,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'estimated_quantity' => 'required|numeric|min:0',
            'expected_harvest_date' => 'required|date|after:today',
            'status' => 'required|string|in:pending,confirmed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $commitment = CropCommitment::create($request->all());
        return response()->json($commitment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CropCommitment $cropCommitment)
    {
        $cropCommitment->load(['farmer', 'cropType']);
        return response()->json($cropCommitment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CropCommitment $cropCommitment)
    {
        $validator = Validator::make($request->all(), [
            'farmer_id' => 'exists:farmers,id',
            'crop_type_id' => 'exists:crop_types,id',
            'estimated_quantity' => 'numeric|min:0',
            'expected_harvest_date' => 'date|after:today',
            'status' => 'string|in:pending,confirmed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cropCommitment->update($request->all());
        return response()->json($cropCommitment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropCommitment $cropCommitment)
    {
        $cropCommitment->delete();
        return response()->json(null, 204);
    }
} 