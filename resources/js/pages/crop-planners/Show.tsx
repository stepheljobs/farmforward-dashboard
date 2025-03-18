import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropPlanner } from '@/types/crop-planner';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { router } from '@inertiajs/core';

interface Props extends PageProps {
    cropPlanner: CropPlanner;
}

export default function Show({ cropPlanner }: Props) {
    const handleStatusUpdate = (status: 'approved' | 'rejected') => {
        router.post(route('crop-planners.update-status', cropPlanner.id), {
            status,
            farmer_notes: '',
        });
    };

    return (
        <>
            <Head title={`Crop Plan - ${cropPlanner.cropType.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Crop Plan Details</h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(route('crop-planners.edit', cropPlanner.id))}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(route('crop-planners.index'))}
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
                                            <dt className="text-sm font-medium text-gray-500">Farmer</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.farmer.first_name} {cropPlanner.farmer.last_name}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Crop Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{cropPlanner.cropType.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    cropPlanner.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    cropPlanner.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {cropPlanner.status.replace('_', ' ')}
                                                </span>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Planning Details</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Planned Area</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.planned_area_hectares} hectares
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Estimated Quantity</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.estimated_quantity}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Planting Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {format(new Date(cropPlanner.planned_planting_date), 'PPP')}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Expected Harvest Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {format(new Date(cropPlanner.expected_harvest_date), 'PPP')}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.location || 'Not specified'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Variety</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.variety || 'Not specified'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Volume Inputs</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.volume_inputs ? 
                                                    `${cropPlanner.volume_inputs} ${cropPlanner.volume_inputs_type}` : 
                                                    'Not specified'}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.contact_number || 'Not specified'}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Notes</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Consultant Notes</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {cropPlanner.consultant_notes || 'No notes provided'}
                                            </dd>
                                        </div>
                                        {cropPlanner.farmer_notes && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Farmer Notes</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {cropPlanner.farmer_notes}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>

                            {cropPlanner.status === 'pending_farmer' && (
                                <div className="mt-6 flex justify-end gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleStatusUpdate('rejected')}
                                        className="bg-red-50 text-red-700 hover:bg-red-100"
                                    >
                                        Reject Plan
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusUpdate('approved')}
                                        className="bg-green-50 text-green-700 hover:bg-green-100"
                                    >
                                        Approve Plan
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 