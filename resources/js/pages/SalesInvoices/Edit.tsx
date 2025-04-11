import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, PageProps } from '@/types';
import { SalesInvoice } from '@/types/sales-invoice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props extends PageProps {
    salesInvoice: SalesInvoice;
    buyers: Array<{ id: number; name: string }>;
    cropArrivals: Array<{ stub_no: string; crop_type: string }>;
}

interface InvoiceItem {
    id?: number;
    crop_arrival_stub: string;
    quantity: number;
    unit_price: number;
    crop_type: string;
    notes?: string;
}

interface FormData {
    invoice_number: string;
    date: string;
    buyer_id: string;
    status: string;
    items: InvoiceItem[];
    tax: number;
    [key: string]: any; // Add index signature for Inertia.js form type constraint
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales Invoice',
        href: `/sales-invoices`,
    },
];

export default function Edit({ salesInvoice, buyers, cropArrivals }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        invoice_number: salesInvoice.invoice_number || '',
        date: salesInvoice.date ? salesInvoice.date.split('T')[0] : new Date().toISOString().split('T')[0],
        buyer_id: salesInvoice.buyer_id ? salesInvoice.buyer_id.toString() : '',
        status: salesInvoice.status || 'draft',
        items: salesInvoice.items.map((item) => ({
            id: item.id,
            crop_arrival_stub: item.crop_arrival_stub || '',
            quantity: item.quantity || 0,
            unit_price: item.unit_price || 0,
            crop_type: item.crop_type || '',
            notes: item.notes || '',
        })),
        tax: salesInvoice.tax || 0,
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
        put(route('sales-invoices.update', salesInvoice.id));
    };

    const getItemError = (index: number, field: keyof InvoiceItem) => {
        const errorKey = `items.${index}.${field}`;
        return errors[errorKey as keyof typeof errors];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Sales Invoice ${salesInvoice.invoice_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Sales Invoice</CardTitle>
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
                                            required
                                            disabled
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

                                    {data.items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center p-8 border rounded-lg border-dashed">
                                            <p className="text-gray-500 mb-2">No items added yet</p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addItem}
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Your First Item
                                            </Button>
                                        </div>
                                    ) : (
                                        data.items.map((item, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                                                <div className="space-y-2">
                                                    <Label>Stub No.</Label>
                                                    <Select
                                                        value={item.crop_arrival_stub}
                                                        onValueChange={(value) => {
                                                            const selectedCrop = cropArrivals.find(
                                                                (crop) => crop.stub_no === value
                                                            );
                                                            updateItem(index, 'crop_arrival_stub', value);
                                                            if (selectedCrop) {
                                                                updateItem(index, 'crop_type', selectedCrop.crop_type);
                                                            }
                                                        }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select crop arrival" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {cropArrivals.map((crop) => (
                                                                <SelectItem key={crop.stub_no} value={crop.stub_no}>
                                                                    {crop.stub_no} - {crop.crop_type}
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
                                        ))
                                    )}
                                </div>

                                <div className="mt-6 space-y-2">
                                    <Label htmlFor="status">Invoice Status</Label>
                                    <Select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        disabled={data.status === 'completed' || data.status === 'cancelled'}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </Select>
                                    {errors.status && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.status}</AlertDescription>
                                        </Alert>
                                    )}
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
                                        Update Sales Invoice
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