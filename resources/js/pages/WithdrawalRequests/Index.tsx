import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Command, CommandEmpty, CommandInput, CommandGroup, CommandItem } from '@/components/ui/command';
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WithdrawalRequest {
    id: number;
    amount: number;
    status: string;
    created_at: string;
}

interface FarmerSale {
    id: string;
    sales_number: string;
    final_amount: string;
    status: string;
    created_at: string;
}

interface Props extends PageProps {
    withdrawalRequests: WithdrawalRequest[];
    farmerSales: FarmerSale[];
}

export default function Index({ farmerSales, withdrawalRequests }: Props) {
    return (
        <AppLayout>
            <Head title="Withdrawal Requests" />

            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Withdrawal Requests</h1>
                    <Select>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select a farmer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Farmers</SelectLabel>
                                <Command>
                                    <CommandInput placeholder="Search farmers..." />
                                    <CommandEmpty>No farmers found.</CommandEmpty>
                                    <CommandGroup>
                                        {farmers.map((farmer) => (
                                            <CommandItem
                                                key={farmer.id}
                                                value={farmer.id}
                                                onSelect={() => {
                                                    router.get(route('withdrawal-requests.create', { farmer_id: farmer.id }));
                                                }}
                                            >
                                                {farmer.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Farmer Sales</CardTitle>
                        <CardDescription>
                            View all completed sales transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sales Number</TableHead>
                                    <TableHead>Final Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {farmerSales.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No sales found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    farmerSales.map((sale) => (
                                        <TableRow key={sale.id}>
                                            <TableCell>{sale.sales_number}</TableCell>
                                            <TableCell>₱{Number(sale.final_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell className="capitalize">{sale.status}</TableCell>
                                            <TableCell>{new Date(sale.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="flex justify-end mt-6">
                    <Button asChild>
                        <a href={route('withdrawal-requests.create')}>New Request</a>
                    </Button>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Recent Requests</CardTitle>
                        <CardDescription>
                            View and manage withdrawal requests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {withdrawalRequests.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No withdrawal requests found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    withdrawalRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>{request.id}</TableCell>
                                            <TableCell>${request.amount.toFixed(2)}</TableCell>
                                            <TableCell>{request.status}</TableCell>
                                            <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" asChild>
                                                    <a href={route('withdrawal-requests.show', request.id)}>View</a>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 