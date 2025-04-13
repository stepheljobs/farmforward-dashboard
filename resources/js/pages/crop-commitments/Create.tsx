import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Farmer, CropType } from '@/types/crop-planner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
    farmers: Farmer[];
    cropTypes: CropType[];
}

export default function Create({ farmers, cropTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        farmer_id: '',
        crop_type_id: '',
        planned_area_hectares: '',
        estimated_quantity: '',
        planned_planting_date: '',
        expected_harvest_date: '',
        consultant_notes: '',
        location: '',
        variety: '',
        volume_inputs: '',
        volume_inputs_type: '',
        contact_number: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('crop-planners.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Crop Plan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Create New Crop Plan</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="farmer_id">Farmer</Label>
                                        <Select
                                            value={data.farmer_id}
                                            onValueChange={(value) => setData('farmer_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a farmer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {farmers.map((farmer) => (
                                                    <SelectItem key={farmer.id} value={farmer.id.toString()}>
                                                        {farmer.first_name} {farmer.last_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.farmer_id && (
                                            <p className="text-sm text-red-600 mt-1">{errors.farmer_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="crop_type_id">Crop Type</Label>
                                        <Select
                                            value={data.crop_type_id}
                                            onValueChange={(value) => setData('crop_type_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a crop type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cropTypes.map((crop) => (
                                                    <SelectItem key={crop.id} value={crop.id.toString()}>
                                                        {crop.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.crop_type_id && (
                                            <p className="text-sm text-red-600 mt-1">{errors.crop_type_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="planned_area_hectares">Planned Area (hectares)</Label>
                                        <Input
                                            id="planned_area_hectares"
                                            type="number"
                                            step="0.01"
                                            value={data.planned_area_hectares}
                                            onChange={(e) => setData('planned_area_hectares', e.target.value)}
                                        />
                                        {errors.planned_area_hectares && (
                                            <p className="text-sm text-red-600 mt-1">{errors.planned_area_hectares}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="estimated_quantity">Estimated Quantity</Label>
                                        <Input
                                            id="estimated_quantity"
                                            type="number"
                                            step="0.01"
                                            value={data.estimated_quantity}
                                            onChange={(e) => setData('estimated_quantity', e.target.value)}
                                        />
                                        {errors.estimated_quantity && (
                                            <p className="text-sm text-red-600 mt-1">{errors.estimated_quantity}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="planned_planting_date">Planned Planting Date</Label>
                                        <Input
                                            id="planned_planting_date"
                                            type="date"
                                            value={data.planned_planting_date}
                                            onChange={(e) => setData('planned_planting_date', e.target.value)}
                                        />
                                        {errors.planned_planting_date && (
                                            <p className="text-sm text-red-600 mt-1">{errors.planned_planting_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="expected_harvest_date">Expected Harvest Date</Label>
                                        <Input
                                            id="expected_harvest_date"
                                            type="date"
                                            value={data.expected_harvest_date}
                                            onChange={(e) => setData('expected_harvest_date', e.target.value)}
                                        />
                                        {errors.expected_harvest_date && (
                                            <p className="text-sm text-red-600 mt-1">{errors.expected_harvest_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="location">Location</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                        />
                                        {errors.location && (
                                            <p className="text-sm text-red-600 mt-1">{errors.location}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="variety">Variety</Label>
                                        <Input
                                            id="variety"
                                            value={data.variety}
                                            onChange={(e) => setData('variety', e.target.value)}
                                        />
                                        {errors.variety && (
                                            <p className="text-sm text-red-600 mt-1">{errors.variety}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="volume_inputs">Volume Inputs</Label>
                                        <Input
                                            id="volume_inputs"
                                            type="number"
                                            step="0.01"
                                            value={data.volume_inputs}
                                            onChange={(e) => setData('volume_inputs', e.target.value)}
                                        />
                                        {errors.volume_inputs && (
                                            <p className="text-sm text-red-600 mt-1">{errors.volume_inputs}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="volume_inputs_type">Volume Inputs Type</Label>
                                        <Select
                                            value={data.volume_inputs_type}
                                            onValueChange={(value) => setData('volume_inputs_type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="can">Can</SelectItem>
                                                <SelectItem value="plants">Plants</SelectItem>
                                                <SelectItem value="lata">Lata</SelectItem>
                                                <SelectItem value="kg">Kilograms</SelectItem>
                                                <SelectItem value="seeds">Seeds</SelectItem>
                                                <SelectItem value="g">Grams</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.volume_inputs_type && (
                                            <p className="text-sm text-red-600 mt-1">{errors.volume_inputs_type}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_number">Contact Number</Label>
                                        <Input
                                            id="contact_number"
                                            value={data.contact_number}
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                        />
                                        {errors.contact_number && (
                                            <p className="text-sm text-red-600 mt-1">{errors.contact_number}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="consultant_notes">Consultant Notes</Label>
                                    <Textarea
                                        id="consultant_notes"
                                        value={data.consultant_notes}
                                        onChange={(e) => setData('consultant_notes', e.target.value)}
                                        rows={4}
                                    />
                                    {errors.consultant_notes && (
                                        <p className="text-sm text-red-600 mt-1">{errors.consultant_notes}</p>
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
                                        Create Plan
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