import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui';

interface Sale {
    id: number;
    sales_number: string;
    sales_invoice_id: number;
    final_amount: number;
    status: string;
    notes: string | null;
    created_at: string;
}

interface ExtendedPageProps extends PageProps {
    sales: Sale[];
}

const calculateTotalSales = (sales: Sale[]): number => {
    return (sales.reduce((sum, sale) => sum + Number(sale.final_amount), 0) || 0);
};

export default function Overview({ sales }: ExtendedPageProps) {
    const searchParams = new URLSearchParams(window.location.search);
    const urlStartDate = searchParams.get('start_date');
    const urlEndDate = searchParams.get('end_date');

    console.log(urlStartDate);
    console.log(urlEndDate);

    const [startDate, setStartDate] = useState<Date>(() => {
        if (urlStartDate) {
            return new Date(urlStartDate);
        }
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    });
    const [endDate, setEndDate] = useState<Date>(() => {
        if (urlEndDate) {
            return new Date(urlEndDate);
        }
        return new Date();
    });

    const handleSubmit = () => {
        router.visit(route('sales-overview'), {
            data: {
                start_date: format(startDate, 'yyyy-MM-dd'),
                end_date: format(endDate, 'yyyy-MM-dd')
            },
            onSuccess: () => {
                window.location.reload();
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Sales Overview" />
            <div className='p-8'>
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Sales Overview</h1>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h3 className="text-sm font-medium text-blue-700">Total Sales</h3>
                                    <p className="text-2xl font-bold text-blue-900">
                                        ₱{calculateTotalSales(sales).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h3 className="text-sm font-medium text-green-700">Total Orders</h3>
                                    <p className="text-2xl font-bold text-green-900">{sales.length}</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <h3 className="text-sm font-medium text-purple-700">Average Order Value</h3>
                                    <p className="text-2xl font-bold text-purple-900">
                                        ₱{(calculateTotalSales(sales) / (sales.length || 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sales Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <div className="flex gap-4 items-center">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Start Date
                                        </label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !startDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    onSelect={setStartDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            End Date
                                        </label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !endDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={endDate}
                                                    onSelect={setEndDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="mt-4">
                                        <Button variant="default" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Sales Number</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sales.map((sale: Sale) => (
                                                <TableRow key={sale.id}>
                                                    <TableCell>{sale.sales_number}</TableCell>
                                                    <TableCell>₱{Number(sale.final_amount).toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize bg-green-100 text-green-700">
                                                            {sale.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{format(new Date(sale.created_at), 'PPP')}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            </div>
        </AppLayout>
    );
} 