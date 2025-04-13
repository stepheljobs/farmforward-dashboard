import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft } from 'lucide-react';

interface Sale {
    id: string;
    sales_number: string;
    final_amount: number;
    status: string;
    finalized_at: string;
    notes?: string;
    sales_invoice: {
        invoice_number: string;
        date: string;
        items: Array<{
            total_price(total_price: any): unknown;
            crop_type: string;
            id: string;
            product: {
                name: string;
            };
            quantity: number;
            unit_price: number;
            total: number;
        }>;
    };
}

interface Props {
    auth: any;
    sale: Sale;
}

export default function Show({ sale }: Props) {
    return (
        <AppLayout>
            <Head title="Sale Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href="/sales"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-800 rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
<ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Sales
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Sale Information</h3>
                                    <dl className="grid grid-cols-1 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Sales Number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{sale.sales_number}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Final Amount</dt>
                                            <dd className="mt-1 text-sm text-gray-900">₱{Number(sale.final_amount).toFixed(2)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1 text-sm text-gray-900 capitalize">{sale.status}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Finalized At</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(sale.finalized_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        {sale.notes && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{sale.notes}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Invoice Information</h3>
                                    <dl className="grid grid-cols-1 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Invoice Number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {sale.sales_invoice.invoice_number}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Invoice Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(sale.sales_invoice.date).toLocaleDateString()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-4">Invoice Items</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Item
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Quantity
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Unit Price
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {sale.sales_invoice.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {item.crop_type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        ₱{Number(item.unit_price).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        ₱{Number(item.total_price).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 