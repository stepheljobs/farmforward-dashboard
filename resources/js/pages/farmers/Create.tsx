import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        middle_initial: '',
        birthdate: '',
        email: '',
        phone_number: '',
        sitio_purok: '',
        barangay: '',
        city: '',
        province: '',
        farm_description: '',
        farm_size_hectares: '',
        farm_count: '1',
        photo: null as File | null,
        farmer_id_number: '',
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('farmers.store'));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    return (
        <AppLayout>
            <Head title="Add New Farmer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Farmer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="first_name">First Name</Label>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.first_name && (
                                            <p className="text-sm text-red-500">{errors.first_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">Last Name</Label>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.last_name && (
                                            <p className="text-sm text-red-500">{errors.last_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="middle_initial">Middle Initial</Label>
                                        <Input
                                            id="middle_initial"
                                            name="middle_initial"
                                            value={data.middle_initial}
                                            onChange={handleInputChange}
                                        />
                                        {errors.middle_initial && (
                                            <p className="text-sm text-red-500">{errors.middle_initial}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farmer_id_number">Farmer ID Number</Label>
                                        <Input
                                            id="farmer_id_number"
                                            name="farmer_id_number"
                                            value={data.farmer_id_number}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.farmer_id_number && (
                                            <p className="text-sm text-red-500">{errors.farmer_id_number}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birthdate">Birth Date</Label>
                                        <Input
                                            id="birthdate"
                                            name="birthdate"
                                            type="date"
                                            value={data.birthdate}
                                            onChange={handleInputChange}
                                        />
                                        {errors.birthdate && (
                                            <p className="text-sm text-red-500">{errors.birthdate}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone_number">Phone Number</Label>
                                        <Input
                                            id="phone_number"
                                            name="phone_number"
                                            value={data.phone_number}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.phone_number && (
                                            <p className="text-sm text-red-500">{errors.phone_number}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sitio_purok">Sitio/Purok</Label>
                                        <Input
                                            id="sitio_purok"
                                            name="sitio_purok"
                                            value={data.sitio_purok}
                                            onChange={handleInputChange}
                                        />
                                        {errors.sitio_purok && (
                                            <p className="text-sm text-red-500">{errors.sitio_purok}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="barangay">Barangay</Label>
                                        <Input
                                            id="barangay"
                                            name="barangay"
                                            value={data.barangay}
                                            onChange={handleInputChange}
                                        />
                                        {errors.barangay && (
                                            <p className="text-sm text-red-500">{errors.barangay}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={data.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-red-500">{errors.city}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="province">Province</Label>
                                        <Input
                                            id="province"
                                            name="province"
                                            value={data.province}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.province && (
                                            <p className="text-sm text-red-500">{errors.province}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farm_size_hectares">Farm Size (Hectares)</Label>
                                        <Input
                                            id="farm_size_hectares"
                                            name="farm_size_hectares"
                                            type="number"
                                            step="0.01"
                                            value={data.farm_size_hectares}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.farm_size_hectares && (
                                            <p className="text-sm text-red-500">{errors.farm_size_hectares}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farm_count">Number of Farms</Label>
                                        <Input
                                            id="farm_count"
                                            name="farm_count"
                                            type="number"
                                            min="1"
                                            value={data.farm_count}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.farm_count && (
                                            <p className="text-sm text-red-500">{errors.farm_count}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="photo">Profile Photo</Label>
                                        <Input
                                            id="photo"
                                            name="photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="border-2 border-dashed rounded-lg aspect-square w-[400px] p-2"
                                        />
                                        {previewImage && (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="mt-2 w-32 h-32 object-cover rounded"
                                            />
                                        )}
                                        {errors.photo && (
                                            <p className="text-sm text-red-500">{errors.photo}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="farm_description">Farm Description</Label>
                                    <Textarea
                                        id="farm_description"
                                        name="farm_description"
                                        value={data.farm_description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.farm_description && (
                                        <p className="text-sm text-red-500">{errors.farm_description}</p>
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
                                        {processing ? 'Registering...' : 'Register Farmer'}
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