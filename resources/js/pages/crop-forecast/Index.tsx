import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface CropForecastProps extends PageProps {
    cropCommitments: any[]; // Replace 'any' with proper type if available
    cropArrivals: any[]; // Replace 'any' with proper type if available
}

export default function CropForecastIndex({ auth, cropCommitments, cropArrivals }: CropForecastProps) {
    return (
        <AppLayout>
            <Head title="Crop Forecast" />
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-bold">Crop Forecast</h1>
                {/* You can now use cropCommitments and cropArrivals here */}
                {console.log(cropCommitments)}
                {console.log(cropArrivals)}
            </div>
        </AppLayout >
    );
} 