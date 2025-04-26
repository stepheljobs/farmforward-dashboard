import React from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

const BuyerCreate: React.FC = () => {
  const form = useForm({
    name: '',
    buyer_id: '',
    phone_number: '',
    address: '',
    status: 'Active',
    destination: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('buyers.store'));
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Buyers', href: route('buyers.index') },
        { title: 'Create Buyer', href: route('buyers.create') },
      ]}
    >
      <Head title="Create Buyer" />
      <div className="container p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create Buyer</h1>
          <Link href={route('buyers.index')}>
            <Button variant="outline">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Buyers
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buyer Information</CardTitle>
            <CardDescription>Enter the details for the new buyer.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.data.name}
                  onChange={e => form.setData('name', e.target.value)}
                  placeholder="Enter buyer name"
                />
                {form.errors.name && (
                  <p className="text-sm text-red-600">{form.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="buyer_id">Buyer ID</Label>
                <Input
                  id="buyer_id"
                  value={form.data.buyer_id}
                  onChange={e => form.setData('buyer_id', e.target.value)}
                  placeholder="Enter unique buyer ID"
                />
                {form.errors.buyer_id && (
                  <p className="text-sm text-red-600">{form.errors.buyer_id}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  value={form.data.phone_number}
                  onChange={e => form.setData('phone_number', e.target.value)}
                  placeholder="Enter phone number"
                />
                {form.errors.phone_number && (
                  <p className="text-sm text-red-600">{form.errors.phone_number}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.data.address}
                  onChange={e => form.setData('address', e.target.value)}
                  placeholder="Enter address"
                />
                {form.errors.address && (
                  <p className="text-sm text-red-600">{form.errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={form.data.destination}
                  onChange={e => form.setData('destination', e.target.value)}
                  placeholder="Enter destination"
                />
                {form.errors.destination && (
                  <p className="text-sm text-red-600">{form.errors.destination}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={form.data.status} 
                  onValueChange={(value) => form.setData('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                {form.errors.status && (
                  <p className="text-sm text-red-600">{form.errors.status}</p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-4"
                disabled={form.processing}
              >
                {form.processing ? 'Creating...' : 'Create Buyer'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BuyerCreate; 