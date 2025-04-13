<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SalesInvoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::latest()
            ->with(['salesInvoice' => function($query) {
                $query->select('id', 'invoice_number');
            }])
            ->paginate(10);

        return Inertia::render('Sales/Index', [
            'sales' => $sales
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pendingInvoices = SalesInvoice::where('status', 'approved')
            ->whereDoesntHave('sale')
            ->with(['items'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Sales/Create', [
            'pendingInvoices' => $pendingInvoices
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sales_invoice_id' => 'required|exists:sales_invoices,id',
            'notes' => 'nullable|string|max:1000',
        ]);

        $invoice = SalesInvoice::findOrFail($request->sales_invoice_id);

        $sale = Sale::create([
            'sales_number' => 'SL-' . date('Ymd') . '-' . Str::random(4),
            'sales_invoice_id' => $invoice->id,
            'finalized_by' => Auth::id(),
            'final_amount' => $invoice->total_amount,
            'status' => 'completed',
            'notes' => $request->notes,
        ]);

        return redirect()->route('sales.index')
            ->with('success', 'Sale finalized successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load(['salesInvoice.items']);

        return Inertia::render('Sales/Show', [
            'sale' => $sale
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
