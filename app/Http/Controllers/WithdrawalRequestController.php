<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\PaymentWithdrawal;   
use App\Models\CropArrival;
use App\Models\SalesInvoice;
use App\Models\Sale;
use Illuminate\Support\Facades\Log;

class WithdrawalRequestController extends Controller
{
    /**
     * Display a listing of the withdrawal requests.
     */
    public function index(Request $request): Response
    {

        //this should accept farmer_id
        $farmerId = $request->farmer_id;

        // using the farmer_id, we can query their crops_arrivals
        $cropsArrivals = CropArrival::where('farmer_id', $farmerId)->get();

        $salesInvoices = SalesInvoice::with('items')->whereHas('items', function($query) use ($cropsArrivals) {
            $query->whereIn('crop_arrival_stub', $cropsArrivals->pluck('stub_no'));
        })->get();

        Log::info('== salesInvoices ==', ['data' => $salesInvoices]);

        // Query sales for all sales invoices
        // whereIn() also works with multiple sales invoice IDs
        $sales = Sale::whereIn('sales_invoice_id', $salesInvoices->pluck('id')->toArray())->get();

        // get the latest payment withdrawal
        $withdrawalRequests = PaymentWithdrawal::where('farmer_id', $farmerId)->latest()->get();

        return Inertia::render('WithdrawalRequests/Index', [
            'withdrawalRequests' => $withdrawalRequests,
            'farmerSales' => $sales
        ]);
    }

    /**
     * Show the form for creating a new withdrawal request.
     */
    public function create(): Response
    {
        return Inertia::render('WithdrawalRequests/Create');
    }

    /**
     * Store a newly created withdrawal request in storage.
     */
    public function store(Request $request)
    {
        // TODO: Implement withdrawal request creation logic
        return redirect()->route('withdrawal-requests.index')
            ->with('success', 'Withdrawal request created successfully.');
    }

    /**
     * Display the specified withdrawal request.
     */
    public function show($id): Response
    {
        return Inertia::render('WithdrawalRequests/Show', [
            'withdrawalRequest' => null
        ]);
    }

    /**
     * Show the form for editing the specified withdrawal request.
     */
    public function edit($id): Response
    {
        return Inertia::render('WithdrawalRequests/Edit', [
            'withdrawalRequest' => null
        ]);
    }

    /**
     * Update the specified withdrawal request in storage.
     */
    public function update(Request $request, $id)
    {
        // TODO: Implement withdrawal request update logic
        return redirect()->route('withdrawal-requests.index')
            ->with('success', 'Withdrawal request updated successfully.');
    }

    /**
     * Remove the specified withdrawal request from storage.
     */
    public function destroy($id)
    {
        // TODO: Implement withdrawal request deletion logic
        return redirect()->route('withdrawal-requests.index')
            ->with('success', 'Withdrawal request deleted successfully.');
    }
} 