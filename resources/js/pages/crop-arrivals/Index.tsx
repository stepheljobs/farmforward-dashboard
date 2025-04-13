import { Head } from '@inertiajs/react';
import { BreadcrumbItem, PageProps } from '@/types';
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
import { Pencil, Plus } from 'lucide-react';
import { Eye } from 'lucide-react';

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crop Arrivals',
        href: '/crop-arrivals',
    },
];
export default function Index({ cropArrivals }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crop Arrivals" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Crop Arrivals</h2>
                                <Button onClick={() => router.visit(route('crop-arrivals.create'))}>
                                    <Plus className="w-4 h-4 mr-2" />
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
                                            <TableCell>{arrival.crop_type.name}</TableCell>
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
                                                        size="icon"
                                                        onClick={() => router.visit(route('crop-arrivals.show', arrival.id))}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline" 
                                                        size="icon"
                                                        onClick={() => router.visit(route('crop-arrivals.edit', arrival.id))}
                                                    >
                                                        <Pencil className="h-4 w-4" />
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