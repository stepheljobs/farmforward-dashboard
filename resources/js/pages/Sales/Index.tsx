import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { Pagination } from "@/components/ui/pagination"

interface Sale {
    id: string;
    sales_number: string;
    sales_invoice: {
        invoice_number: string;
        buyer: {
            name: string;
        };
    };
    final_amount: number;
    finalized_at: string;
}

interface Props {
    auth: any;
    sales: {
        data: Sale[];
        links: any;
    };
}

export default function Index({ auth, sales }: Props) {
    return (
        <AppLayout>
            <Head title="Sales" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between mb-6">
                                <h3 className="text-lg font-semibold">Sales Records</h3>
                                <Link
                                    href={route('sales.create')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Create New Sale
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sales Number
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
                                                Finalized At
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {sales.data.map((sale) => (
                                            <tr key={sale.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {sale.sales_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {sale.sales_invoice.invoice_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {sale.sales_invoice.buyer.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${sale.final_amount.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(sale.finalized_at).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Link
                                                        href={route('sales.show', sale.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <Pagination links={sales.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 