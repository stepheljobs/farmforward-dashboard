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
    nickname: '',
    last_name: '',
    first_name: '',
    middle_initial: '',
    buyer_id: '',
    birthdate: '',
    email: '',
    phone_number: '',
    sitio_purok_subdivision: '',
    barangay: '',
    city_municipality: '',
    province: '',
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
      <div className="container py-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    value={form.data.nickname}
                    onChange={e => form.setData('nickname', e.target.value)}
                    placeholder="Enter nickname (optional)"
                  />
                  {form.errors.nickname && (
                    <p className="text-sm text-red-600">{form.errors.nickname}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={form.data.last_name}
                    onChange={e => form.setData('last_name', e.target.value)}
                    placeholder="Enter last name"
                  />
                  {form.errors.last_name && (
                    <p className="text-sm text-red-600">{form.errors.last_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={form.data.first_name}
                    onChange={e => form.setData('first_name', e.target.value)}
                    placeholder="Enter first name"
                  />
                  {form.errors.first_name && (
                    <p className="text-sm text-red-600">{form.errors.first_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middle_initial">Middle Initial</Label>
                  <Input
                    id="middle_initial"
                    value={form.data.middle_initial}
                    onChange={e => form.setData('middle_initial', e.target.value)}
                    placeholder="Enter middle initial"
                    maxLength={5}
                  />
                  {form.errors.middle_initial && (
                    <p className="text-sm text-red-600">{form.errors.middle_initial}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={form.data.birthdate}
                    onChange={e => form.setData('birthdate', e.target.value)}
                  />
                  {form.errors.birthdate && (
                    <p className="text-sm text-red-600">{form.errors.birthdate}</p>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.data.email}
                    onChange={e => form.setData('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                  {form.errors.email && (
                    <p className="text-sm text-red-600">{form.errors.email}</p>
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
              </div>

              <h3 className="text-lg font-medium border-b pb-2 mt-8">Address Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sitio_purok_subdivision">Sitio / Purok / Subdivision</Label>
                  <Input
                    id="sitio_purok_subdivision"
                    value={form.data.sitio_purok_subdivision}
                    onChange={e => form.setData('sitio_purok_subdivision', e.target.value)}
                    placeholder="Enter sitio, purok, or subdivision"
                  />
                  {form.errors.sitio_purok_subdivision && (
                    <p className="text-sm text-red-600">{form.errors.sitio_purok_subdivision}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barangay">Barangay</Label>
                  <Input
                    id="barangay"
                    value={form.data.barangay}
                    onChange={e => form.setData('barangay', e.target.value)}
                    placeholder="Enter barangay"
                  />
                  {form.errors.barangay && (
                    <p className="text-sm text-red-600">{form.errors.barangay}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city_municipality">City / Municipality</Label>
                  <Input
                    id="city_municipality"
                    value={form.data.city_municipality}
                    onChange={e => form.setData('city_municipality', e.target.value)}
                    placeholder="Enter city or municipality"
                  />
                  {form.errors.city_municipality && (
                    <p className="text-sm text-red-600">{form.errors.city_municipality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    value={form.data.province}
                    onChange={e => form.setData('province', e.target.value)}
                    placeholder="Enter province"
                  />
                  {form.errors.province && (
                    <p className="text-sm text-red-600">{form.errors.province}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select 
                  value={form.data.destination} 
                  onValueChange={(value) => form.setData('destination', value)}
                >
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select destination (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Local">Local</SelectItem>
                    <SelectItem value="Regional">Regional</SelectItem>
                    <SelectItem value="National">National</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="Direct Consumer">Direct Consumer</SelectItem>
                  </SelectContent>
                </Select>
                {form.errors.destination && (
                  <p className="text-sm text-red-600">{form.errors.destination}</p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-4 float-right"
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