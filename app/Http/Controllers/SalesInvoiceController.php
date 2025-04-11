<?php

namespace App\Http\Controllers;

use App\Models\SalesInvoice;
use App\Models\CropArrival;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class SalesInvoiceController extends Controller
{
    /**
     * Display a listing of the sales invoices.
     */
    public function index(): Response
    {
        $salesInvoices = SalesInvoice::with(['items'])->latest()->paginate(10);
        return Inertia::render('SalesInvoices/Index', [
            'salesInvoices' => $salesInvoices
        ]);
    }

    /**
     * Show the form for creating a new sales invoice.
     */
    public function create(): Response
    {
        $cropArrivals = CropArrival::select('stub_no', 'crop_type as crop_type')->get();
        
        return Inertia::render('SalesInvoices/Create', [
            'cropArrivals' => $cropArrivals
        ]);
    }

    /**
     * Store a newly created sales invoice in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Debug incoming request data
        Log::info('Incoming sales invoice data:', $request->all());

        try {
            $validated = $request->validate([
                'invoice_number' => 'required|string|unique:sales_invoices',
                'date' => 'required|date',
                'items' => 'required|array|min:1',
                'items.*.crop_arrival_stub' => 'required|exists:crop_arrivals,stub_no',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.unit_price' => 'required|numeric|min:0',
                'items.*.crop_type' => 'required|string',
                'items.*.notes' => 'nullable|string',
                'tax' => 'required|numeric|min:0',
            ]);

            DB::beginTransaction();
            
            // Log validated data
            Log::info('Validated data:', $validated);

            $subtotal = collect($validated['items'])->sum(function ($item) {
                return $item['quantity'] * $item['unit_price'];
            });

            $salesInvoice = SalesInvoice::create([
                'invoice_number' => $validated['invoice_number'],
                'date' => $validated['date'],
                'subtotal' => $subtotal,
                'tax' => $validated['tax'],
                'total_amount' => $subtotal + $validated['tax'],
                'status' => 'draft',
                'payment_status' => 'pending',
            ]);

            foreach ($validated['items'] as $item) {
                $salesInvoice->items()->create([
                    'crop_arrival_stub' => $item['crop_arrival_stub'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                    'crop_type' => $item['crop_type'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();
            Log::info('Sales invoice created successfully', ['id' => $salesInvoice->id]);

            return redirect()->route('sales-invoices.show', $salesInvoice)
                ->with('success', 'Sales invoice created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Sales invoice creation failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->with('error', 'Failed to create sales invoice. ' . $e->getMessage());
        }
    }

    /**
     * Display the specified sales invoice.
     */
    public function show(SalesInvoice $salesInvoice): Response
    {
        $salesInvoice->load(['items']);
        return Inertia::render('SalesInvoices/Show', [
            'salesInvoice' => $salesInvoice
        ]);
    }

    /**
     * Show the form for editing the specified sales invoice.
     */
    public function edit(SalesInvoice $salesInvoice): Response
    {
        $salesInvoice->load(['items']);
        $cropArrivals = CropArrival::select('stub_no', 'crop_type')->get();
        
        return Inertia::render('SalesInvoices/Edit', [
            'salesInvoice' => $salesInvoice,
            'cropArrivals' => $cropArrivals
        ]);
    }

    /**
     * Update the specified sales invoice in storage.
     */
    public function update(Request $request, SalesInvoice $salesInvoice): RedirectResponse
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|unique:sales_invoices,invoice_number,' . $salesInvoice->id,
            'date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.crop_arrival_stub' => 'required|exists:crop_arrivals,stub_no',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.crop_type' => 'required|string',
            'items.*.notes' => 'nullable|string',
            'tax' => 'required|numeric|min:0',
            'status' => 'required|in:draft,pending,approved,completed,cancelled',
        ]);

        try {
            DB::beginTransaction();

            $subtotal = collect($validated['items'])->sum(function ($item) {
                return $item['quantity'] * $item['unit_price'];
            });

            $salesInvoice->update([
                'invoice_number' => $validated['invoice_number'],
                'date' => $validated['date'],
                'subtotal' => $subtotal,
                'tax' => $validated['tax'],
                'total_amount' => $subtotal + $validated['tax'],
                'status' => $validated['status'],
            ]);

            // Delete existing items
            $salesInvoice->items()->delete();

            // Create new items
            foreach ($validated['items'] as $item) {
                $salesInvoice->items()->create([
                    'crop_arrival_stub' => $item['crop_arrival_stub'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                    'crop_type' => $item['crop_type'],
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            DB::commit();

            return redirect()->route('sales-invoices.show', $salesInvoice)
                ->with('success', 'Sales invoice updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to update sales invoice. ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified sales invoice from storage.
     */
    public function destroy(SalesInvoice $salesInvoice): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $salesInvoice->items()->delete();
            $salesInvoice->delete();

            DB::commit();

            return redirect()->route('sales-invoices.index')
                ->with('success', 'Sales invoice deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to delete sales invoice. ' . $e->getMessage());
        }
    }

    /**
     * Update the status of the specified sales invoice.
     */
    public function updateStatus(Request $request, SalesInvoice $salesInvoice): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:draft,pending,completed,cancelled',
            'payment_status' => 'required|in:pending,partial,paid',
        ]);

        $salesInvoice->update($validated);

        return response()->json([
            'message' => 'Sales invoice status updated successfully.',
            'salesInvoice' => $salesInvoice
        ]);
    }
} 