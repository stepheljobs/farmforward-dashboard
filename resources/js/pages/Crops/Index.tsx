import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PlusIcon, TrashIcon, PencilIcon, EyeIcon, DownloadIcon } from 'lucide-react';
import { Crop } from '@/types';

interface Props {
  crops: Crop[];
}

const CropIndex: React.FC<Props> = ({ crops }) => {
  return (
    <AppLayout breadcrumbs={[{ title: 'Crops', href: route('crops.index') }]}>
      <Head title="Crops" />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crops</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={route('crops.export')}>
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download as CSV
              </Link>
            </Button>
            <Button asChild>
              <Link href={route('crops.create')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Crop
              </Link>
            </Button>
          </div>
        </div>

        <Table>
          <TableCaption>List of all crops</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Variety</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {crops.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No crops found. Create your first crop.
                </TableCell>
              </TableRow>
            ) : (
              crops.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>{crop.variety}</TableCell>
                  <TableCell>{crop.sku}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      crop.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : crop.status === 'Inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {crop.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('crops.show', crop.id)}>
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('crops.edit', crop.id)}>
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600" asChild>
                      <Link href={route('crops.destroy', crop.id)} method="delete" as="button">
                        <TrashIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default CropIndex; 