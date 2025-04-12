<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\CropArrival;
use App\Models\CropCommitment;
use Illuminate\Support\Facades\Log;

class CropForecastController extends Controller
{
    /**
     * Display the crop forecast page.
     */
    public function index(): Response
    {
        $cropCommitments = CropCommitment::whereMonth('expected_harvest_date', now()->month)
            ->with(['cropType:id,name', 'farmer:id,first_name,last_name'])
            ->get();

        Log::info($cropCommitments);

        $cropArrivals = CropArrival::whereMonth('month', now()->month)
            ->orWhereMonth('month', now()->addMonth()->month)
            ->get()
            ->groupBy('month');

        // Log::info($cropArrivals);
        
        return Inertia::render('crop-forecast/Index', [
            'cropCommitments' => $cropCommitments,
            'cropArrivals' => $cropArrivals,
        ]);
    }
} 