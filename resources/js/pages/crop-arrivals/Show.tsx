import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropArrival } from '@/types/crop-arrival';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { router } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
    cropArrival: CropArrival;
}

export default function Show({ cropArrival }: Props) {
    return (
        <AppLayout>
            <Head title={`Crop Arrival - ${cropArrival.stub_no}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Crop Arrival Details</h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(route('crop-arrivals.edit', cropArrival.id))}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(route('crop-arrivals.index'))}
                                    >
                                        Back to List
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Stub Number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.stub_no}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Received Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {format(new Date(cropArrival.received_date), 'MMMM d, yyyy')}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Farmer</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropArrival.farmer.first_name} {cropArrival.farmer.last_name}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Field</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.field.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Crop Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.cropType.name}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Quantity Details</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Good Quantity</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.quantity_good}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Semi Quantity</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.quantity_semi}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Reject Quantity</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.quantity_reject}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Total Quantity</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropArrival.quantity_good + cropArrival.quantity_semi + cropArrival.quantity_reject}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Receipt Information</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Receipt ID</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.receipt_id || '-'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Receipt Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropArrival.receipt_name || '-'}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 