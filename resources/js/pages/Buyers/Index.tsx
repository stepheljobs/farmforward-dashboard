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
import { Buyer } from '@/types';

interface Props {
  buyers: Buyer[];
}

const BuyerIndex: React.FC<Props> = ({ buyers }) => {
  return (
    <AppLayout breadcrumbs={[{ title: 'Buyers', href: route('buyers.index') }]}>
      <Head title="Buyers" />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Buyers</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={route('buyers.export')}>
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download as CSV
              </Link>
            </Button>
            <Button asChild>
              <Link href={route('buyers.create')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Buyer
              </Link>
            </Button>
          </div>
        </div>

        <Table>
          <TableCaption>List of all buyers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Buyer ID</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buyers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No buyers found. Create your first buyer.
                </TableCell>
              </TableRow>
            ) : (
              buyers.map((buyer) => (
                <TableRow key={buyer.id}>
                  <TableCell className="font-medium">
                    {buyer.full_name}
                    {buyer.nickname && <span className="text-xs text-gray-500 block">"{buyer.nickname}"</span>}
                  </TableCell>
                  <TableCell>{buyer.buyer_id}</TableCell>
                  <TableCell>
                    {buyer.phone_number && <div>{buyer.phone_number}</div>}
                    {buyer.email && <div className="text-xs text-gray-500">{buyer.email}</div>}
                  </TableCell>
                  <TableCell>{buyer.province || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      buyer.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : buyer.status === 'Inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {buyer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('buyers.show', buyer.id)}>
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={route('buyers.edit', buyer.id)}>
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600" asChild>
                      <Link href={route('buyers.destroy', buyer.id)} method="delete" as="button">
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

export default BuyerIndex; 