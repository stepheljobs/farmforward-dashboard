import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Link } from '@inertiajs/react';

interface Farmer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    farm_description: string;
    farm_size_hectares: number;
    profile_image: string | null;
    registration_date: string;
    membership_renewal_date: string;
    farms: any[];
    crop_commitments: any[];
}

interface CropArrival {
    id: number;
    stub_no: string;
    received_date: string;
    receipt_id: string;
    receipt_name: string;
    quantity_good: number;
    quantity_semi: number;
    quantity_reject: number;
}

interface Props extends PageProps {
    farmer: Farmer;
    cropsArrival: CropArrival[];
}

export default function Show({ auth, farmer, cropsArrival }: Props) {
    return (
        <AppLayout>
            <Head title={`Farmer: ${farmer.first_name} ${farmer.last_name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 my-8 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Farmer Details</CardTitle>
                            <div className="flex gap-2">
                                <Link href={route('farmers.edit', farmer.id)}>
                                    <Button variant="outline">Edit Farmer</Button>
                                </Link>
                                <Link href={route('farmers.index')}>
                                    <Button variant="outline">Back to List</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Profile Image</h3>
                                        {farmer.profile_image ? (
                                            <img
                                                src={`/storage/${farmer.profile_image}`}
                                                alt={`${farmer.first_name} ${farmer.last_name}`}
                                                className="mt-2 w-32 h-32 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="mt-2 w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                                                <span className="text-gray-500">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                                        <p className="mt-1">{farmer.first_name} {farmer.last_name}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                        <p className="mt-1">{farmer.email}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                        <p className="mt-1">{farmer.phone_number}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Address</h3>
                                        <p className="mt-1">
                                            {farmer.address}<br />
                                            {farmer.city}, {farmer.province}<br />
                                            {farmer.postal_code}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Farm Size</h3>
                                        <p className="mt-1">{farmer.farm_size_hectares} hectares</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Farm Description</h3>
                                        <p className="mt-1 whitespace-pre-wrap">{farmer.farm_description}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                                        <p className="mt-1">
                                            {format(new Date(farmer.registration_date), 'MMMM d, yyyy')}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Membership Renewal Date</h3>
                                        <p className="mt-1">
                                            {format(new Date(farmer.membership_renewal_date), 'MMMM d, yyyy')}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Number of Farms</h3>
                                        <p className="mt-1">{farmer.farms.length}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Active Crop Commitments</h3>
                                        <p className="mt-1">{farmer.crop_commitments.length}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crops Arrivals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Stub No</TableHead>
                                        <TableHead>Received Date</TableHead>
                                        <TableHead>Receipt ID</TableHead>
                                        <TableHead>Receipt Name</TableHead>
                                        <TableHead>Quantity Good</TableHead>
                                        <TableHead>Quantity Semi</TableHead>
                                        <TableHead>Quantity Reject</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cropsArrival.map((crop) => (
                                        <TableRow key={crop.id}>
                                            <TableCell>{crop.stub_no}</TableCell>
                                            <TableCell>
                                                {format(new Date(crop.received_date), 'MMMM d, yyyy')}
                                            </TableCell>
                                            <TableCell>{crop.receipt_id}</TableCell>
                                            <TableCell>{crop.receipt_name}</TableCell>
                                            <TableCell>{crop.quantity_good}</TableCell>
                                            <TableCell>{crop.quantity_semi}</TableCell>
                                            <TableCell>{crop.quantity_reject}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 