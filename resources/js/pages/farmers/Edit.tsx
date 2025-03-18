import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import { useState } from 'react';

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
    farmer: Farmer;
}

export default function Edit({ auth, farmer }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: farmer.first_name,
        last_name: farmer.last_name,
        email: farmer.email,
        phone: farmer.phone,
        registration_date: farmer.registration_date,
        membership_renewal_date: farmer.membership_renewal_date,
        profile_image: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(
        farmer.profile_image ? `/storage/${farmer.profile_image}` : null
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('farmers.update', farmer.id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('profile_image', file);
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
                                            error={errors.first_name}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">Last Name</Label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={e => setData('last_name', e.target.value)}
                                            error={errors.last_name}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            error={errors.email}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            error={errors.phone}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="registration_date">Registration Date</Label>
                                        <Input
                                            id="registration_date"
                                            type="date"
                                            value={data.registration_date}
                                            onChange={e => setData('registration_date', e.target.value)}
                                            error={errors.registration_date}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="membership_renewal_date">Membership Renewal Date</Label>
                                        <Input
                                            id="membership_renewal_date"
                                            type="date"
                                            value={data.membership_renewal_date}
                                            onChange={e => setData('membership_renewal_date', e.target.value)}
                                            error={errors.membership_renewal_date}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="profile_image">Profile Image</Label>
                                    <Input
                                        id="profile_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        error={errors.profile_image}
                                    />
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