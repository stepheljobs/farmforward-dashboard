<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Sale;

class SalesOverviewController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if ($startDate && $endDate) {
            $sales = Sale::whereBetween('created_at', [
                now()->parse($startDate)->startOfDay(),
                now()->parse($endDate)->endOfDay()
            ])->get();
        } else {
            $sales = Sale::whereBetween('created_at', [now()->subDays(7), now()])->get();
        }

        return inertia('Sales/Overview', [
            'sales' => $sales
        ]);
    }
} 