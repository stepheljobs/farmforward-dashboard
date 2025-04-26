import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface Farmer {
    id: number;
    first_name: string;
    last_name: string;
    middle_initial?: string;
    birthdate?: string;
    email: string;
    phone_number: string;
    sitio_purok?: string;
    barangay?: string;
    city: string;
    province: string;
    farm_description?: string;
    farm_size_hectares?: number;
    farm_count?: number;
    membership_date: string;
    membership_renewal_date: string;
    photo: string | null;
}

interface Props {
    farmer: Farmer;
}

export default function Edit({ farmer }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: farmer.first_name,
        last_name: farmer.last_name,
        middle_initial: farmer.middle_initial || '',
        birthdate: farmer.birthdate || '',
        email: farmer.email,
        phone_number: farmer.phone_number,
        sitio_purok: farmer.sitio_purok || '',
        barangay: farmer.barangay || '',
        city: farmer.city,
        province: farmer.province,
        farm_description: farmer.farm_description || '',
        farm_size_hectares: farmer.farm_size_hectares?.toString() || '',
        farm_count: farmer.farm_count?.toString() || '1',
        membership_date: farmer.membership_date,
        membership_renewal_date: farmer.membership_renewal_date,
        photo: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(
        farmer.photo ? `/storage/${farmer.photo}` : null
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('farmers.update', farmer.id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Farmer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Farmer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="first_name">First Name</Label>
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={e => setData('first_name', e.target.value)}
                                        />
                                        {errors.first_name && (
                                            <p className="text-sm text-red-500">{errors.first_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">Last Name</Label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={e => setData('last_name', e.target.value)}
                                        />
                                        {errors.last_name && (
                                            <p className="text-sm text-red-500">{errors.last_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="middle_initial">Middle Initial</Label>
                                        <Input
                                            id="middle_initial"
                                            value={data.middle_initial}
                                            onChange={e => setData('middle_initial', e.target.value)}
                                        />
                                        {errors.middle_initial && (
                                            <p className="text-sm text-red-500">{errors.middle_initial}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birthdate">Birth Date</Label>
                                        <Input
                                            id="birthdate"
                                            type="date"
                                            value={data.birthdate}
                                            onChange={e => setData('birthdate', e.target.value)}
                                        />
                                        {errors.birthdate && (
                                            <p className="text-sm text-red-500">{errors.birthdate}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone_number">Phone Number</Label>
                                        <Input
                                            id="phone_number"
                                            value={data.phone_number}
                                            onChange={e => setData('phone_number', e.target.value)}
                                        />
                                        {errors.phone_number && (
                                            <p className="text-sm text-red-500">{errors.phone_number}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sitio_purok">Sitio/Purok</Label>
                                        <Input
                                            id="sitio_purok"
                                            value={data.sitio_purok}
                                            onChange={e => setData('sitio_purok', e.target.value)}
                                        />
                                        {errors.sitio_purok && (
                                            <p className="text-sm text-red-500">{errors.sitio_purok}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="barangay">Barangay</Label>
                                        <Input
                                            id="barangay"
                                            value={data.barangay}
                                            onChange={e => setData('barangay', e.target.value)}
                                        />
                                        {errors.barangay && (
                                            <p className="text-sm text-red-500">{errors.barangay}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-red-500">{errors.city}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="province">Province</Label>
                                        <Input
                                            id="province"
                                            value={data.province}
                                            onChange={e => setData('province', e.target.value)}
                                        />
                                        {errors.province && (
                                            <p className="text-sm text-red-500">{errors.province}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farm_size_hectares">Farm Size (Hectares)</Label>
                                        <Input
                                            id="farm_size_hectares"
                                            type="number"
                                            step="0.01"
                                            value={data.farm_size_hectares}
                                            onChange={e => setData('farm_size_hectares', e.target.value)}
                                        />
                                        {errors.farm_size_hectares && (
                                            <p className="text-sm text-red-500">{errors.farm_size_hectares}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farm_count">Number of Farms</Label>
                                        <Input
                                            id="farm_count"
                                            type="number"
                                            min="1"
                                            value={data.farm_count}
                                            onChange={e => setData('farm_count', e.target.value)}
                                        />
                                        {errors.farm_count && (
                                            <p className="text-sm text-red-500">{errors.farm_count}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="membership_date">Membership Date</Label>
                                        <Input
                                            id="membership_date"
                                            type="date"
                                            value={data.membership_date}
                                            onChange={e => setData('membership_date', e.target.value)}
                                        />
                                        {errors.membership_date && (
                                            <p className="text-sm text-red-500">{errors.membership_date}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="membership_renewal_date">Membership Renewal Date</Label>
                                        <Input
                                            id="membership_renewal_date"
                                            type="date"
                                            value={data.membership_renewal_date}
                                            onChange={e => setData('membership_renewal_date', e.target.value)}
                                        />
                                        {errors.membership_renewal_date && (
                                            <p className="text-sm text-red-500">{errors.membership_renewal_date}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="farm_description">Farm Description</Label>
                                    <Textarea
                                        id="farm_description"
                                        value={data.farm_description}
                                        onChange={e => setData('farm_description', e.target.value)}
                                    />
                                    {errors.farm_description && (
                                        <p className="text-sm text-red-500">{errors.farm_description}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="photo">Profile Photo</Label>
                                    <Input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {errors.photo && (
                                        <p className="text-sm text-red-500">{errors.photo}</p>
                                    )}
                                    {previewUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={previewUrl}
                                                alt="Profile preview"
                                                className="w-32 h-32 rounded-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        Update Farmer
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 