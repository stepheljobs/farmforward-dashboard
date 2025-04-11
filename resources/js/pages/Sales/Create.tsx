import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pagination } from "@/components/ui/pagination"

interface Invoice {
    id: string;
    invoice_number: string;
    buyer: {
        name: string;
    };
    total_amount: number;
    date: string;
}

interface Props {
    auth: any;
    pendingInvoices: {
        data: Invoice[];
        links: any;
    };
}

export default function Create({ auth, pendingInvoices }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        sales_invoice_id: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('sales.store'));
    };

    return (
        <AppLayout>
            <Head title="Finalize Sale" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-6">Select Invoice to Finalize</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Select
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Invoice Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Buyer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pendingInvoices.data.map((invoice) => (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="radio"
                                                        name="sales_invoice_id"
                                                        value={invoice.id}
                                                        checked={data.sales_invoice_id === invoice.id}
                                                        onChange={(e) => setData('sales_invoice_id', e.target.value)}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {invoice.invoice_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {invoice.buyer.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${invoice.total_amount.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(invoice.date).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <Pagination links={pendingInvoices.links} />
                            </div>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div>
                                    <Label htmlFor="notes">Notes (Optional)</Label>
                                    <Input
                                        id="notes"
                                        type="text"
                                        name="notes"
                                        value={data.notes}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('notes', e.target.value)}
                                    />
                                    {errors.notes && (
                                        <Alert variant="destructive" className="mt-2">
                                            <AlertDescription>{errors.notes}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="flex items-center justify-end">
                                    <Button disabled={processing}>
                                        Finalize Sale
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 