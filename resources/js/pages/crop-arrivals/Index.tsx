import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropArrival } from '@/types/crop-arrival';
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
    cropArrivals: {
        data: CropArrival[];
        current_page: number;
        total: number;
        per_page: number;
        from: number;
        to: number;
    };
}

export default function Index({ cropArrivals }: Props) {
    return (
        <AppLayout>
            <Head title="Crop Arrivals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Crop Arrivals</h2>
                                <Button onClick={() => router.visit(route('crop-arrivals.create'))}>
                                    Add Arrival
                                </Button>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Stub No.</TableHead>
                                        <TableHead>Farmer</TableHead>
                                        <TableHead>Crop Type</TableHead>
                                        <TableHead>Received Date</TableHead>
                                        <TableHead>Total Quantity</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cropArrivals.data.map((arrival) => (
                                        <TableRow key={arrival.id}>
                                            <TableCell>{arrival.stub_no}</TableCell>
                                            <TableCell>
                                                {arrival.farmer.first_name} {arrival.farmer.last_name}
                                            </TableCell>
                                            <TableCell>{arrival.cropType.name}</TableCell>
                                            <TableCell>
                                                {format(new Date(arrival.received_date), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                {arrival.quantity_good + arrival.quantity_semi + arrival.quantity_reject}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => router.visit(route('crop-arrivals.show', arrival.id))}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => router.visit(route('crop-arrivals.edit', arrival.id))}
                                                    >
                                                        Edit
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 