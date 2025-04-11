<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\CropPlannerController;
use App\Http\Controllers\CropArrivalController;
use App\Http\Controllers\SalesInvoiceController;
use App\Http\Controllers\SalesController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Farmers routes
    Route::resource('farmers', FarmerController::class);

    // Crop-planners routes
    Route::resource('crop-planners', CropPlannerController::class);
    Route::put('crop-planners/{cropPlanner}/status', [CropPlannerController::class, 'updateStatus'])->name('crop-planners.update-status');

    // Crop-arrivals routes
    Route::resource('crop-arrivals', CropArrivalController::class);

    // Sales Invoices Routes
    Route::resource('sales-invoices', SalesInvoiceController::class);
    Route::patch('sales-invoices/{salesInvoice}/status', [SalesInvoiceController::class, 'updateStatus'])
        ->name('sales-invoices.update-status');

    Route::resource('sales', SalesController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
