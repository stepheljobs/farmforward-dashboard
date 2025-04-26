import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Crop } from '@/types';

interface Props {
  crop: Crop;
}

const CropShow: React.FC<Props> = ({ crop }) => {
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Crops', href: route('crops.index') },
        { title: crop.name, href: route('crops.show', crop.id) },
      ]}
    >
      <Head title={`Crop: ${crop.name}`} />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href={route('crops.index')}>
            <Button variant="ghost">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <h1 className="text-2xl font-bold">Crop Details</h1>
            </Button>
          </Link>
          
          <div className="flex space-x-2">
            <Link href={route('crops.edit', crop.id)}>
              <Button variant="outline">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Link href={route('crops.destroy', crop.id)} method="delete" as="button">
              <Button variant="outline" className="text-red-600">
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{crop.name}</CardTitle>
            <CardDescription>Crop information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Name</p>
              <p>{crop.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Variety</p>
              <p>{crop.variety || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">SKU</p>
              <p>{crop.sku}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Status</p>
              <p>
                <span className={`px-2 py-1 rounded-full text-xs ${crop.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : crop.status === 'Inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {crop.status}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CropShow;