import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropArrival } from '@/types/crop-arrival';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { router } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';
import CropArrivalReceipt from '@/components/receipts/CropArrivalReceipt';
import { useRef } from 'react';
import { ArrowLeftIcon, PrinterIcon, PencilIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props extends PageProps {
    cropArrival: CropArrival;
}

export default function Show({ cropArrival }: Props) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (receiptRef.current) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Crop Arrival Receipt - ${cropArrival.stub_no}</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body>
                            ${receiptRef.current.innerHTML}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            }
        }
    };

    return (
        <AppLayout>
            <Head title={`Crop Arrival - ${cropArrival.stub_no}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header with navigation and actions */}
                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route('crop-arrivals.index'))}
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handlePrint}
                            >
                                <PrinterIcon className="w-4 h-4 mr-2" />
                                Print
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => router.visit(route('crop-arrivals.edit', cropArrival.id))}
                            >
                                <PencilIcon className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </div>
                    </div>

                    {/* Receipt Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Receipt Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Receipt ID</div>
                                    <div className="mt-1 text-lg">{cropArrival.receipt_id || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Receipt Name</div>
                                    <div className="mt-1 text-lg">{cropArrival.receipt_name || '-'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Stub Number</div>
                                    <div className="mt-1 text-lg">{cropArrival.stub_no}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Received Date</div>
                                    <div className="mt-1 text-lg">
                                        {format(new Date(cropArrival.received_date), 'MMMM d, yyyy')}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Farmer</div>
                                    <div className="mt-1 text-lg">
                                        {cropArrival.farmer.first_name} {cropArrival.farmer.last_name}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Field</div>
                                    <div className="mt-1 text-lg">{cropArrival.field.name}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Crop Type</div>
                                    <div className="mt-1 text-lg">{cropArrival.crop_type.name}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quantity Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quantity Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Good Quantity</div>
                                    <div className="mt-1 text-lg">{cropArrival.quantity_good}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Semi Quantity</div>
                                    <div className="mt-1 text-lg">{cropArrival.quantity_semi}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Reject Quantity</div>
                                    <div className="mt-1 text-lg">{cropArrival.quantity_reject}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Total Quantity</div>
                                    <div className="mt-1 text-lg">
                                        {cropArrival.quantity_good + cropArrival.quantity_semi + cropArrival.quantity_reject}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Hidden receipt component for printing */}
            <div className="hidden">
                <div ref={receiptRef}>
                    <CropArrivalReceipt cropArrival={cropArrival} />
                </div>
            </div>
        </AppLayout>
    );
} 