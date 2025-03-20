import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Props extends PageProps {
    cropArrivals: Array<{ stub_no: string; crop_type: string }>;
}

interface InvoiceItem {
    crop_arrival_stub: string;
    quantity: number;
    unit_price: number;
    crop_type: string;
    notes?: string;
}

interface FormData {
    invoice_number: string;
    date: string;
    items: InvoiceItem[];
    tax: number;
    [key: string]: any;
}

export default function Create({ cropArrivals }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        invoice_number: `SI-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getHours()).padStart(2, '0')}${String(new Date().getMinutes()).padStart(2, '0')}`,
        date: new Date().toISOString().split('T')[0],
        items: [{ crop_arrival_stub: '', quantity: 1, unit_price: 0, crop_type: '', notes: '' }],
        tax: 0,
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            { crop_arrival_stub: '', quantity: 1, unit_price: 0, crop_type: '', notes: '' },
        ]);
    };

    const removeItem = (index: number) => {
        setData(
            'items',
            data.items.filter((_, i) => i !== index)
        );
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting data:', data); // Debug the data being sent
        post(route('sales-invoices.store'), {
            onSuccess: () => {
                console.log('Success - Invoice created');
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
            }
        });
    };

    const getItemError = (index: number, field: keyof InvoiceItem) => {
        const errorKey = `items.${index}.${field}`;
        return errors[errorKey as keyof typeof errors];
    };

    return (
        <AppLayout>
            <Head title="Create Sales Invoice" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Sales Invoice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="invoice_number">Invoice Number</Label>
                                        <Input
                                            id="invoice_number"
                                            value={data.invoice_number}
                                            onChange={(e) => setData('invoice_number', e.target.value)}
                                            readOnly
                                            required
                                        />
                                        {errors.invoice_number && (
                                            <p className="text-sm text-red-600">{errors.invoice_number}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                        />
                                        {errors.date && (
                                            <p className="text-sm text-red-600">{errors.date}</p>
                                        )}
                                    </div>

                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">Items</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addItem}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Item
                                        </Button>
                                    </div>

                                    {data.items.map((item, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                                            <div className="space-y-2">
                                                <Label>Stub No.</Label>
                                                <Select
                                                    value={item.crop_arrival_stub}
                                                    onValueChange={(value) => {
                                                        const selectedCrop = cropArrivals.find(
                                                            (crop) => crop.stub_no === value
                                                        );
                                                        
                                                        // Update both fields at once
                                                        const newItems = [...data.items];
                                                        newItems[index] = {
                                                            ...newItems[index],
                                                            crop_arrival_stub: value,
                                                            crop_type: selectedCrop?.crop_type || ''
                                                        };
                                                        setData('items', newItems);
                                                    }}
                                                >
                                                    <SelectTrigger className={errors[`items.${index}.crop_arrival_stub`] ? 'border-red-500' : ''}>
                                                        <SelectValue placeholder="Select crop arrival" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {cropArrivals.map((crop) => (
                                                            <SelectItem key={crop.stub_no} value={crop.stub_no}>
                                                                {crop.stub_no}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {getItemError(index, 'crop_arrival_stub') && (
                                                    <p className="text-sm text-red-600">
                                                        {getItemError(index, 'crop_arrival_stub')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Quantity</Label>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateItem(index, 'quantity', parseInt(e.target.value))
                                                    }
                                                    required
                                                />
                                                {getItemError(index, 'quantity') && (
                                                    <p className="text-sm text-red-600">
                                                        {getItemError(index, 'quantity')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Unit Price</Label>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={item.unit_price}
                                                    onChange={(e) =>
                                                        updateItem(index, 'unit_price', parseFloat(e.target.value))
                                                    }
                                                    required
                                                />
                                                {getItemError(index, 'unit_price') && (
                                                    <p className="text-sm text-red-600">
                                                        {getItemError(index, 'unit_price')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Crop Type</Label>
                                                <Input
                                                    value={item.crop_type}
                                                    onChange={(e) => updateItem(index, 'crop_type', e.target.value)}
                                                    required
                                                />
                                                {getItemError(index, 'crop_type') && (
                                                    <p className="text-sm text-red-600">
                                                        {getItemError(index, 'crop_type')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Notes</Label>
                                                <Input
                                                    value={item.notes}
                                                    onChange={(e) => updateItem(index, 'notes', e.target.value)}
                                                />
                                                {getItemError(index, 'notes') && (
                                                    <p className="text-sm text-red-600">
                                                        {getItemError(index, 'notes')}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex self-center mt-[12px]">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        Create Invoice
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