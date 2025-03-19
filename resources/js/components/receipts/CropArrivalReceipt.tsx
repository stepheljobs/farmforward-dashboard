import { format } from 'date-fns';
import { CropArrival } from '@/types/crop-arrival';
import { Barcode } from '@/components/ui/barcode';

interface Props {
    cropArrival: CropArrival;
}

export default function CropArrivalReceipt({ cropArrival }: Props) {
    return (
        <div className="p-8 max-w-2xl mx-auto bg-white">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Crop Arrival Receipt</h1>
                <p className="text-gray-600">FarmForward</p>
            </div>

            <div className="border-b pb-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Receipt No.</p>
                        <p className="font-semibold">{cropArrival.stub_no}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">
                            {format(new Date(cropArrival.received_date), 'MMMM d, yyyy')}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center my-4">
                    <Barcode
                        value={cropArrival.stub_no}
                        height={64}
                        displayValue={true}
                        textMargin={0}
                        fontSize={16}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Farmer Information</h2>
                <p className="font-medium">
                    {cropArrival.farmer.first_name} {cropArrival.farmer.last_name}
                </p>
                <p className="text-gray-600">Field: {cropArrival.field.name}</p>
                <p className="text-gray-600">Crop Type: {cropArrival.crop_type.name}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Quantity Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Good Quantity</p>
                        <p className="font-semibold">{cropArrival.quantity_good}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Semi Quantity</p>
                        <p className="font-semibold">{cropArrival.quantity_semi}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Reject Quantity</p>
                        <p className="font-semibold">{cropArrival.quantity_reject}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Quantity</p>
                        <p className="font-semibold">
                            {cropArrival.quantity_good + cropArrival.quantity_semi + cropArrival.quantity_reject}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Receipt ID</p>
                        <p className="font-semibold">{cropArrival.receipt_id || '-'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Receipt Name</p>
                        <p className="font-semibold">{cropArrival.receipt_name || '-'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 