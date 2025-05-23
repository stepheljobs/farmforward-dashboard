<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\CropArrivalController;
use App\Http\Controllers\CropCommitmentController;
use App\Http\Controllers\SalesInvoiceController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\CropForecastController;
use App\Http\Controllers\SalesOverviewController;
use App\Http\Controllers\WithdrawalRequestController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\BuyerController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Sales Overview route
    Route::get('/sales-overview', [SalesOverviewController::class, 'index'])->name('sales-overview');

    // Farmers routes
    Route::resource('farmers', FarmerController::class);

    // Crop-commitments routes
    Route::resource('crop-commitments', CropCommitmentController::class);
    Route::put('crop-commitments/{cropPlanner}/status', [CropCommitmentController::class, 'updateStatus'])->name('crop-commitments.update-status');

    // Crop-arrivals routes
    Route::resource('crop-arrivals', CropArrivalController::class);

    // Sales Invoices Routes
    Route::resource('sales-invoices', SalesInvoiceController::class);
    Route::patch('sales-invoices/{salesInvoice}/status', [SalesInvoiceController::class, 'updateStatus'])
        ->name('sales-invoices.update-status');

    Route::resource('sales', SalesController::class);

    // Crop Forecast route
    Route::get('/crop-forecast/{month?}', [CropForecastController::class, 'index'])
        ->where('month', '[1-9]|1[0-2]')
        ->name('crop-forecast.index');

    // Withdrawal Requests routes
    Route::resource('withdrawal-requests', WithdrawalRequestController::class);
    
    // Employees routes
    Route::resource('employees', EmployeeController::class);
    
    // Crops routes
    Route::resource('crops', CropController::class);
    Route::get('crops-export', [CropController::class, 'export'])->name('crops.export');
    
    // Buyers routes
    Route::resource('buyers', BuyerController::class);
    Route::get('buyers-export', [BuyerController::class, 'export'])->name('buyers.export');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
