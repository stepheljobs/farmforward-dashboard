import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface CropForecastProps extends PageProps {
    aggregatedCropCommitments: {
        id: string;
        crop_type: string;
        farmers: { name: string }[];
        estimated_quantity: number;
        arrivals_quantity: number;
        expected_harvest_month: string;
    }[];
}

export default function CropForecastIndex({ cropCommitments, aggregatedCropCommitments }: CropForecastProps) {
    return (
        <AppLayout>
            <Head title="Crop Forecast" />
            <div className="px-12">

                <div className="container mx-auto py-6">
                    <h1 className="text-2xl font-bold mb-6">Crop Commitments vs Arrival</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Crop Type</TableHead>
                                <TableHead>Farmers</TableHead>
                                <TableHead>Commitments</TableHead>
                                <TableHead>Arrivals</TableHead>
                                <TableHead>Month</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {aggregatedCropCommitments.map((crop) => (
                                <TableRow key={crop.id}>
                                    <TableCell>{crop.crop_type}</TableCell>
                                    <TableCell>
                                        {crop.farmers.map(farmer => farmer.name).join(', ')}
                                    </TableCell>
                                    <TableCell>{crop.estimated_quantity}</TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        {crop.arrivals_quantity}
                                        {crop.arrivals_quantity > crop.estimated_quantity ? (
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                            </svg>
                                        ) : crop.arrivals_quantity < crop.estimated_quantity ? (
                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        ) : null}
                                    </TableCell>
                                    <TableCell>{crop.expected_harvest_month}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
} 