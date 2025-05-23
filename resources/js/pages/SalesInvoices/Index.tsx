import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { SalesInvoice } from '@/types/sales-invoice';
import { Button } from '@/components/ui/button';
import { Eye, Plus, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
    salesInvoices: {
        data: SalesInvoice[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ salesInvoices }: Props) {
    console.log(salesInvoices);
    return (
        <AppLayout breadcrumbs={[{ title: 'Sales Invoices', href: route('sales-invoices.index') }]}>
            <Head title="Sales Invoices" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Sales Invoices</h2>
                                <Link href={route('sales-invoices.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Invoice
                                    </Button>
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice Number</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Total Amount</TableHead>
                                            <TableHead>Payment Status</TableHead>
                                            <TableHead>Invoice Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salesInvoices.data.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell>{invoice.invoice_number}</TableCell>
                                                <TableCell>
                                                    {format(new Date(invoice.date), 'MM/dd/yyyy')}
                                                </TableCell>
                                                <TableCell>
                                                    ₱{Number(invoice.total_amount).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            invoice.payment_status === 'paid'
                                                                ? 'default'
                                                                : invoice.payment_status === 'partial'
                                                                ? 'secondary'
                                                                : 'outline'
                                                        }
                                                    >
                                                        {invoice.payment_status}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            invoice.status === 'completed'
                                                                ? 'default'
                                                                : invoice.status === 'pending'
                                                                ? 'secondary'
                                                                : 'outline'
                                                        }
                                                    >
                                                        {invoice.status}
                                                    </Badge>
                                                </TableCell>
                                               
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => router.visit(route('sales-invoices.show', invoice.id))}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon" 
                                                            onClick={() => router.visit(route('sales-invoices.edit', invoice.id))}
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
            </div>
        </AppLayout>
    );
} 