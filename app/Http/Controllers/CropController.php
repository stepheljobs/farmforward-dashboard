<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CropController extends Controller
{
    /**
     * Display a listing of the crops.
     */
    public function index()
    {
        $crops = Crop::all();
        return inertia('Crops/Index', [
            'crops' => $crops
        ]);
    }

    /**
     * Show the form for creating a new crop.
     */
    public function create()
    {
        return inertia('Crops/Create');
    }

    /**
     * Store a newly created crop in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), Crop::validationRules());

        if ($validator->fails()) {
            return redirect()->route('crops.create')
                ->withErrors($validator)
                ->withInput();
        }

        Crop::create($validator->validated());

        return redirect()->route('crops.index')
            ->with('success', 'Crop created successfully.');
    }

    /**
     * Display the specified crop.
     */
    public function show(Crop $crop)
    {
        return inertia('Crops/Show', [
            'crop' => $crop
        ]);
    }

    /**
     * Show the form for editing the specified crop.
     */
    public function edit(Crop $crop)
    {
        return inertia('Crops/Edit', [
            'crop' => $crop
        ]);
    }

    /**
     * Update the specified crop in storage.
     */
    public function update(Request $request, Crop $crop)
    {
        $rules = Crop::validationRules();
        // Modify the unique rule for sku to ignore the current crop
        $rules['sku'] = 'required|string|max:50|unique:crops,sku,' . $crop->id;

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->route('crops.edit', $crop->id)
                ->withErrors($validator)
                ->withInput();
        }

        $crop->update($validator->validated());

        return redirect()->route('crops.index')
            ->with('success', 'Crop updated successfully.');
    }

    /**
     * Remove the specified crop from storage.
     */
    public function destroy(Crop $crop)
    {
        $crop->delete();

        return redirect()->route('crops.index')
            ->with('success', 'Crop deleted successfully.');
    }

    /**
     * Export crops data as CSV
     */
    public function export()
    {
        $crops = Crop::all();
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="crops.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];
        
        $callback = function() use ($crops) {
            $file = fopen('php://output', 'w');
            
            // Add headers
            fputcsv($file, ['ID', 'Name', 'Variety', 'SKU', 'Status', 'Created At', 'Updated At']);
            
            // Add rows
            foreach ($crops as $crop) {
                fputcsv($file, [
                    $crop->id,
                    $crop->name,
                    $crop->variety,
                    $crop->sku,
                    $crop->status,
                    $crop->created_at,
                    $crop->updated_at
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }
} 