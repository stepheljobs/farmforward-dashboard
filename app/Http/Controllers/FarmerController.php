<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreFarmerRequest;
use App\Http\Requests\UpdateFarmerRequest;
use Inertia\Inertia;
use App\Models\CropArrival;
use App\Models\SalesInvoice;
use Illuminate\Support\Facades\Log;

class FarmerController extends Controller
{
    /**
     * Display a listing of the farmers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $farmers = Farmer::latest()->paginate(10);
        
        return Inertia::render('farmers/Index', [
            'farmers' => $farmers
        ]);
    }

    /**
     * Show the form for creating a new farmer.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('farmers/Create');
    }

    /**
     * Store a newly created farmer in storage.
     *
     * @param  \App\Http\Requests\StoreFarmerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFarmerRequest $request)
    {
        $validated = $request->validated();
        
        // Handle photo upload if provided
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')
                ->store('farmers/profile-images', 'public');
        }
        
        // Set default values for dates if not provided
        $validated['membership_date'] = $validated['membership_date'] ?? now();
        $validated['membership_renewal_date'] = $validated['membership_renewal_date'] ?? now()->addYear();
        
        $farmer = Farmer::create($validated);
        
        return redirect()->route('farmers.show', $farmer)
            ->with('success', 'Farmer created successfully');
    }

    /**
     * Display the specified farmer.
     *
     * @param  \App\Models\Farmer  $farmer
     * @return \Illuminate\Http\Response
     */
    public function show(Farmer $farmer)
    {
        // Load related data
        $farmer->load(['farms', 'cropCommitments']);
        
        // list of crops arrival
        $cropsArrival = CropArrival::where('farmer_id', $farmer->id)->get();

        return Inertia::render('farmers/Show', [
            'farmer' => $farmer,
            'cropsArrival' => $cropsArrival
        ]);
    }

    /**
     * Show the form for editing the specified farmer.
     *
     * @param  \App\Models\Farmer  $farmer
     * @return \Illuminate\Http\Response
     */
    public function edit(Farmer $farmer)
    {
        return Inertia::render('farmers/Edit', [
            'farmer' => $farmer
        ]);
    }

    /**
     * Update the specified farmer in storage.
     *
     * @param  \App\Http\Requests\UpdateFarmerRequest  $request
     * @param  \App\Models\Farmer  $farmer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFarmerRequest $request, Farmer $farmer)
    {
        $validated = $request->validated();
        
        // Handle photo upload if provided
        if ($request->hasFile('photo')) {
            // Delete old image if exists
            if ($farmer->photo) {
                Storage::disk('public')->delete($farmer->photo);
            }
            
            $validated['photo'] = $request->file('photo')
                ->store('farmers/profile-images', 'public');
        }
        
        $farmer->update($validated);
        
        return redirect()->route('farmers.show', $farmer)
            ->with('success', 'Farmer updated successfully');
    }

    /**
     * Remove the specified farmer from storage.
     *
     * @param  \App\Models\Farmer  $farmer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Farmer $farmer)
    {
        // Since we have soft deletes on the model, this won't permanently delete
        $farmer->delete();
        
        return redirect()->route('farmers.index')
            ->with('success', 'Farmer deleted successfully');
    }
    
    /**
     * Display farmer performance metrics.
     *
     * @param  \App\Models\Farmer  $farmer
     * @return \Illuminate\Http\Response
     */
    public function performanceMetrics(Farmer $farmer)
    {
        $year = request('year', date('Y'));
        $metrics = $farmer->getPerformanceMetrics($year);
        
        return view('farmers.metrics', compact('farmer', 'metrics', 'year'));
    }
} 