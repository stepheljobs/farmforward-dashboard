import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CropArrival } from '@/types/crop-arrival';
import { Farmer } from '@/types/crop-planner';
import { CropType } from '@/types';
import { Field } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';


interface Props extends PageProps {
    cropArrival: CropArrival;
    farmers: Farmer[];
    cropTypes: CropType[];
    fields: Field[];
}

export default function Edit({ cropArrival, farmers, cropTypes, fields }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        stub_no: cropArrival.stub_no,
        received_date: cropArrival.received_date.split('T')[0],
        farmer_id: cropArrival.farmer_id.toString(),
        field_id: cropArrival.field_id.toString(),
        crop_type_id: cropArrival.crop_type_id.toString(),
        quantity_good: cropArrival.quantity_good.toString(),
        quantity_semi: cropArrival.quantity_semi.toString(),
        quantity_reject: cropArrival.quantity_reject.toString(),
        receipt_id: cropArrival.receipt_id || '',
        receipt_name: cropArrival.receipt_name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('crop-arrivals.update', cropArrival.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Crop Arrival" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Edit Crop Arrival</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="stub_no">Stub Number</Label>
                                        <Input
                                            id="stub_no"
                                            value={data.stub_no}
                                            onChange={e => setData('stub_no', e.target.value)}
                                            error={errors.stub_no}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="received_date">Received Date</Label>
                                        <Input
                                            id="received_date"
                                            type="date"
                                            value={data.received_date}
                                            onChange={e => setData('received_date', e.target.value)}
                                            error={errors.received_date}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="farmer_id">Farmer</Label>
                                        <Select
                                            value={data.farmer_id}
                                            onValueChange={value => setData('farmer_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select farmer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {farmers.map(farmer => (
                                                    <SelectItem key={farmer.id} value={farmer.id.toString()}>
                                                        {farmer.first_name} {farmer.last_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="field_id">Field</Label>
                                        <Select
                                            value={data.field_id}
                                            onValueChange={value => setData('field_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select field" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {fields.map(field => (
                                                    <SelectItem key={field.id} value={field.id.toString()}>
                                                        {field.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="crop_type_id">Crop Type</Label>
                                        <Select
                                            value={data.crop_type_id}
                                            onValueChange={value => setData('crop_type_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select crop type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cropTypes.map(cropType => (
                                                    <SelectItem key={cropType.id} value={cropType.id.toString()}>
                                                        {cropType.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="quantity_good">Good Quantity</Label>
                                        <Input
                                            id="quantity_good"
                                            type="number"
                                            step="0.01"
                                            value={data.quantity_good}
                                            onChange={e => setData('quantity_good', e.target.value)}
                                            error={errors.quantity_good}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="quantity_semi">Semi Quantity</Label>
                                        <Input
                                            id="quantity_semi"
                                            type="number"
                                            step="0.01"
                                            value={data.quantity_semi}
                                            onChange={e => setData('quantity_semi', e.target.value)}
                                            error={errors.quantity_semi}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="quantity_reject">Reject Quantity</Label>
                                        <Input
                                            id="quantity_reject"
                                            type="number"
                                            step="0.01"
                                            value={data.quantity_reject}
                                            onChange={e => setData('quantity_reject', e.target.value)}
                                            error={errors.quantity_reject}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="receipt_id">Receipt ID</Label>
                                        <Input
                                            id="receipt_id"
                                            value={data.receipt_id}
                                            onChange={e => setData('receipt_id', e.target.value)}
                                            error={errors.receipt_id}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="receipt_name">Receipt Name</Label>
                                        <Input
                                            id="receipt_name"
                                            value={data.receipt_name}
                                            onChange={e => setData('receipt_name', e.target.value)}
                                            error={errors.receipt_name}
                                        />
                                    </div>
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
                                        Update Arrival
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 