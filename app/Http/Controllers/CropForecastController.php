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
    public function index(?int $month = null): Response
    {

        $month = $month ?? now()->month;

        $cropCommitments = CropCommitment::whereMonth('expected_harvest_date', $month)
            ->with(['cropType:id,name', 'farmer:id,first_name,last_name'])
            ->get();

        $cropCommitments = $cropCommitments
            ->groupBy('crop_type_id')
            ->map(function ($commitments) {
                $first = $commitments->first();
                return [
                    'id' => $first->id,
                    'farmers' => $commitments->map(function ($commitment) {
                        return [
                            'id' => $commitment->farmer_id,
                            'name' => $commitment->farmer->first_name . ' ' . $commitment->farmer->last_name
                        ];
                    })->values(),
                    'crop_type_id' => $first->crop_type_id,
                    'estimated_quantity' => $commitments->sum('estimated_quantity'),
                    'crop_type' => $first->cropType->name,
                    'expected_harvest_month' => $first->expected_harvest_date->format('F')
                ];
            })->values();

        $cropArrivals = CropArrival::whereMonth('received_date', $month)
            ->with(['cropType:id,name'])
            ->select('id', 'received_date', 'crop_type_id', 'quantity_good', 'quantity_semi', 'quantity_reject', 'created_at')
            ->get()
            ->groupBy('crop_type_id')
            ->map(function ($arrivals) {
                $first = $arrivals->first();
                return [
                    'id' => $first->id,
                    'crop_type_id' => $first->crop_type_id,
                    'expected_harvest_month' => $first->received_date->format('F'),
                    'crop_type' => $first->cropType->name,
                    'arrivals_quantity' => $arrivals->sum(function($arrival) {
                        return $arrival->quantity_good + $arrival->quantity_semi + $arrival->quantity_reject;
                    })
                ];
            })->values();

        $aggregatedCropCommitments = $cropCommitments->map(function ($commitment) use ($cropArrivals) {
            $commitment['arrivals_quantity'] = $cropArrivals->where('crop_type_id', $commitment['crop_type_id'])->first()['arrivals_quantity'] ?? 0;
            return $commitment;
        });
        
        return Inertia::render('crop-forecast/Index', [
            'month' => now()->setMonth($month)->format('F'),
            'cropCommitments' => $cropCommitments,
            'cropArrivals' => $cropArrivals,
            'aggregatedCropCommitments' => $aggregatedCropCommitments
        ]);
    }
} 