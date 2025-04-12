import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropPlanner } from '@/types/crop-planner';
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

interface Props extends PageProps {
    cropPlanners: {
        data: CropPlanner[];
        current_page: number;
        total: number;
        per_page: number;
        from: number;
        to: number;
    };
}

export default function Index({ cropPlanners }: Props) {
    return (
        <AppLayout>
            <Head title="Crop Planners" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Crop Planners</h2>
                                <Button onClick={() => router.visit(route('crop-planners.create'))}>
                                    Add Data
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Farmer</TableHead>
                                        <TableHead>Crop Type</TableHead>
                                        <TableHead>Area (ha)</TableHead>
                                        <TableHead>Planting Date</TableHead>
                                        <TableHead>Harvest Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cropPlanners.data.map((planner) => (
                                        <TableRow key={planner.id}>
                                            <TableCell>
                                                {planner.farmer.first_name} {planner.farmer.last_name}
                                            </TableCell>
                                            <TableCell>{planner.crop_type.name}</TableCell>
                                            <TableCell>{planner.planned_area_hectares}</TableCell>
                                            <TableCell>
                                                {format(new Date(planner.planned_planting_date), 'PPP')}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(planner.expected_harvest_date), 'PPP')}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    planner.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                    planner.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {planner.status.replace('_', ' ')}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => router.visit(route('crop-planners.show', planner.id))}
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
                                    Showing {cropPlanners.from} to {cropPlanners.to} of {cropPlanners.total} results
                                </div>
                                <div className="flex gap-2">
                                    {cropPlanners.current_page > 1 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.visit(`?page=${cropPlanners.current_page - 1}`)}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {cropPlanners.current_page < Math.ceil(cropPlanners.total / cropPlanners.per_page) && (
                                        <Button
                                            variant="outline"
                                            onClick={() => router.visit(`?page=${cropPlanners.current_page + 1}`)}
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