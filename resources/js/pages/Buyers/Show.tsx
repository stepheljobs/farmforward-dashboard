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
import { Buyer } from '@/types';

interface Props {
  buyer: Buyer;
}

const BuyerShow: React.FC<Props> = ({ buyer }) => {
  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Buyers', href: route('buyers.index') },
        { title: buyer.name, href: route('buyers.show', buyer.id) },
      ]}
    >
      <Head title={`Buyer: ${buyer.name}`} />
      <div className="container p-8">
        <div className="flex justify-between items-center mb-6">
          <Link href={route('buyers.index')}>
            <Button variant="ghost">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              <h1 className="text-2xl font-bold">Buyer Details</h1>
            </Button>
          </Link>
          
          <div className="flex space-x-2">
            <Link href={route('buyers.edit', buyer.id)}>
              <Button variant="outline">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Link href={route('buyers.destroy', buyer.id)} method="delete" as="button">
              <Button variant="outline" className="text-red-600">
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{buyer.name}</CardTitle>
            <CardDescription>Buyer information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Name</p>
              <p>{buyer.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Buyer ID</p>
              <p>{buyer.buyer_id}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Phone Number</p>
              <p>{buyer.phone_number || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Address</p>
              <p>{buyer.address || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Destination</p>
              <p>{buyer.destination || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Status</p>
              <p>
                <span className={`px-2 py-1 rounded-full text-xs ${buyer.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : buyer.status === 'Inactive'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {buyer.status}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BuyerShow; 