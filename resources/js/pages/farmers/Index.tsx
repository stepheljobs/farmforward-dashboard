import { Head } from '@inertiajs/react';
import { BreadcrumbItem, PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { Link } from '@inertiajs/react';
import { EyeIcon, Plus } from 'lucide-react';
import { PencilIcon } from 'lucide-react';

interface Farmer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Farmers',
        href: '/farmers',
    },
];

export default function Index({ auth, farmers }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Farmers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <h2 className="text-2xl font-semibold">Farmers List</h2>
                            <Link href={route('farmers.create')}>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Farmer
                                </Button>
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
                                            <TableCell>{farmer.phone_number}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link href={route('farmers.show', farmer.id)}>
                                                        <Button variant="outline" size="icon">
                                                            <EyeIcon className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('farmers.edit', farmer.id)}>
                                                        <Button variant="outline" size="icon">
                                                            <PencilIcon className="h-4 w-4" />
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
                                            className={`px-3 py-1 rounded ${page === farmers.current_page
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