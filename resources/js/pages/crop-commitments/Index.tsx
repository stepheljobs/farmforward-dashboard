import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropCommitment } from '@/types/crop-commitment';
import { router } from '@inertiajs/core';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import { Plus } from 'lucide-react';

interface Props extends PageProps {
    cropCommitments: Array<{
        id: number;
        farmer_id: number;
        crop_type_id: number;
        estimated_quantity: number;
        expected_harvest_date: string;
        status: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        farmer: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            phone_number: string;
            address: string;
            city: string;
            province: string;
            postal_code: string;
            farm_description: string;
            farm_size_hectares: number;
            status: string;
            registration_date: string;
            membership_renewal_date: string;
            profile_image: string | null;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
        };
        crop_type: {
            id: number;
            name: string;
            description: string;
            season: string;
            growing_period_days: number;
            price_per_kg: number;
            is_active: boolean;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
        };
    }>;
}

export default function Index({ cropCommitments }: Props) {
    return (
        <AppLayout>
            <Head title="Crop Commitments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Crop Commitments</h2>
                                <Button onClick={() => router.visit(route('crop-commitments.create'))}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Commitment
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Farmer</TableHead>
                                        <TableHead>Crop Type</TableHead>
                                        <TableHead>Estimated Quantity</TableHead>
                                        <TableHead>Harvest Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cropCommitments.map((commitment) => (
                                        <TableRow key={commitment.id}>
                                            <TableCell>
                                                {commitment.farmer.first_name} {commitment.farmer.last_name}
                                            </TableCell>
                                            <TableCell>{commitment.crop_type.name}</TableCell>
                                            <TableCell>{commitment.estimated_quantity}</TableCell>
                                            <TableCell>
                                                {format(new Date(commitment.expected_harvest_date), 'PPP')}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    commitment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    commitment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {commitment.status.replace('_', ' ')}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.visit(route('crop-commitments.show', commitment.id))}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    Showing {cropCommitments.from} to {cropCommitments.to} of {cropCommitments.total} results
                                </div>
                                <div className="flex gap-2">
                                    {cropCommitments.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.visit(`?page=${cropCommitments.current_page - 1}`)}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {cropCommitments.current_page < Math.ceil(cropCommitments.total / cropCommitments.per_page) && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.visit(`?page=${cropCommitments.current_page + 1}`)}
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 