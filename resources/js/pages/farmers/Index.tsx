import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';

interface Farmer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    registration_date: string;
    membership_renewal_date: string;
    profile_image: string | null;
}

interface Props extends PageProps {
    farmers: {
        data: Farmer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ auth, farmers }: Props) {
    return (
        <AppLayout>
            <Head title="Farmers" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <h2 className="text-2xl font-semibold">Farmers List</h2>
                            <Link href={route('farmers.create')}>
                                <Button>Register New Farmer</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Registration Date</TableHead>
                                        <TableHead>Membership Renewal</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {farmers.data.map((farmer) => (
                                        <TableRow key={farmer.id}>
                                            <TableCell className="font-medium">
                                                {farmer.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {farmer.profile_image && (
                                                        <img
                                                            src={`/storage/${farmer.profile_image}`}
                                                            alt={`${farmer.first_name} ${farmer.last_name}`}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    )}
                                                    {farmer.first_name} {farmer.last_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{farmer.email}</TableCell>
                                            <TableCell>{farmer.phone}</TableCell>
                                            <TableCell>
                                                {format(new Date(farmer.registration_date), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(farmer.membership_renewal_date), 'MMM d, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link href={route('farmers.show', farmer.id)}>
                                                        <Button variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('farmers.edit', farmer.id)}>
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {farmers.last_page > 1 && (
                                <div className="mt-4 flex justify-center gap-2">
                                    {Array.from({ length: farmers.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={route('farmers.index', { page })}
                                            className={`px-3 py-1 rounded ${
                                                page === farmers.current_page
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 