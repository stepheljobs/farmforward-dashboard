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
        { title: buyer.full_name, href: route('buyers.show', buyer.id) },
      ]}
    >
      <Head title={`Buyer: ${buyer.full_name}`} />
      <div className="container py-8">
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
            <CardTitle>{buyer.full_name}</CardTitle>
            <CardDescription>
              {buyer.nickname && <span className="font-medium">"{buyer.nickname}"</span>}
              {buyer.nickname && " - "}
              Buyer information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium border-b pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Buyer ID</p>
                      <p>{buyer.buyer_id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">Full Name</p>
                      <p>{buyer.full_name}</p>
                    </div>
                    {buyer.birthdate && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Birthdate</p>
                        <p>{new Date(buyer.birthdate).toLocaleDateString()}</p>
                      </div>
                    )}
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
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium border-b pb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {buyer.phone_number && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Phone Number</p>
                        <p>{buyer.phone_number}</p>
                      </div>
                    )}
                    {buyer.email && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Email</p>
                        <p>{buyer.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium border-b pb-2">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {buyer.sitio_purok_subdivision && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Sitio / Purok / Subdivision</p>
                        <p>{buyer.sitio_purok_subdivision}</p>
                      </div>
                    )}
                    {buyer.barangay && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Barangay</p>
                        <p>{buyer.barangay}</p>
                      </div>
                    )}
                    {buyer.city_municipality && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">City / Municipality</p>
                        <p>{buyer.city_municipality}</p>
                      </div>
                    )}
                    {buyer.province && (
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Province</p>
                        <p>{buyer.province}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-500">Complete Address</p>
                    <p>{buyer.complete_address || '-'}</p>
                  </div>
                </div>

                {buyer.destination && (
                  <div>
                    <h3 className="text-lg font-medium border-b pb-2">Additional Information</h3>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-500">Destination</p>
                      <p>{buyer.destination}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BuyerShow; 