import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { SalesInvoice } from '@/types/sales-invoice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Link } from '@inertiajs/react';
import { Barcode } from '@/components/ui/barcode';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Printer } from 'lucide-react';

interface Props extends PageProps {
    salesInvoice: SalesInvoice;
}

export default function Show({ salesInvoice }: Props) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <AppLayout>
            <Head title={`Sales Invoice ${salesInvoice.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="print:shadow-none print:border-none">
                        <CardHeader className="print:py-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="print:text-xl">Sales Invoice Details</CardTitle>
                                <div className="flex space-x-4 print:hidden">
                                    <Button 
                                        variant="outline" 
                                        onClick={handlePrint}
                                        className="flex items-center gap-2"
                                    >
                                        <Printer className="h-4 w-4" />
                                        Print Invoice
                                    </Button>
                                    <Link href={route('sales-invoices.edit', salesInvoice.id)}>
                                        <Button variant="outline">Edit Invoice</Button>
                                    </Link>
                                    <Link href={route('sales-invoices.index')}>
                                        <Button variant="outline">Back to List</Button>
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Invoice Information</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-medium">Invoice Number:</span>{' '}
                                            {salesInvoice.invoice_number}
                                        </div>
                                        <div>
                                            <span className="font-medium">Barcode:</span>{' '}
                                            <div className="mt-1">
                                                <Barcode 
                                                    value={salesInvoice.invoice_number}
                                                    height={48}
                                                    width={2}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-medium">Date:</span>{' '}
                                            {format(new Date(salesInvoice.date), 'PPP')}
                                        </div>
                                        <div>
                                            <span className="font-medium">Status:</span>{' '}
                                            <Badge
                                                variant={
                                                    salesInvoice.status === 'completed'
                                                        ? 'default'
                                                        : salesInvoice.status === 'pending'
                                                        ? 'secondary'
                                                        : 'outline'
                                                }
                                            >
                                                {salesInvoice.status}
                                            </Badge>
                                        </div>
                                        <div>
                                            <span className="font-medium">Payment Status:</span>{' '}
                                            <Badge
                                                variant={
                                                    salesInvoice.payment_status === 'paid'
                                                        ? 'default'
                                                        : salesInvoice.payment_status === 'partial'
                                                        ? 'secondary'
                                                        : 'outline'
                                                }
                                            >
                                                {salesInvoice.payment_status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Financial Summary</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-medium">Subtotal:</span>{' '}
                                            ${Number(salesInvoice.subtotal).toFixed(2)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Tax:</span>{' '}
                                            ${Number(salesInvoice.tax).toFixed(2)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Total Amount:</span>{' '}
                                            ${Number(salesInvoice.total_amount).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-4">Invoice Items</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Crop Arrival</TableHead>
                                            <TableHead>Crop Type</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Unit Price</TableHead>
                                            <TableHead>Total Price</TableHead>
                                            <TableHead>Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salesInvoice.items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.crop_arrival_stub}</TableCell>
                                                <TableCell>{item.crop_type}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>${Number(item.unit_price).toFixed(2)}</TableCell>
                                                <TableCell>${Number(item.total_price).toFixed(2)}</TableCell>
                                                <TableCell>{item.notes}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 