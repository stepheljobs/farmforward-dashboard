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

const CropCreate: React.FC = () => {
  const form = useForm({
    name: '',
    variety: '',
    sku: '',
    status: 'Active',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('crops.store'));
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Crops', href: route('crops.index') },
        { title: 'Create Crop', href: route('crops.create') },
      ]}
    >
      <Head title="Create Crop" />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create Crop</h1>
          <Link href={route('crops.index')}>
            <Button variant="outline">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Crops
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crop Information</CardTitle>
            <CardDescription>Enter the details for the new crop.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.data.name}
                  onChange={e => form.setData('name', e.target.value)}
                  placeholder="Enter crop name"
                />
                {form.errors.name && (
                  <p className="text-sm text-red-600">{form.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="variety">Variety</Label>
                <Input
                  id="variety"
                  value={form.data.variety}
                  onChange={e => form.setData('variety', e.target.value)}
                  placeholder="Enter crop variety (optional)"
                />
                {form.errors.variety && (
                  <p className="text-sm text-red-600">{form.errors.variety}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={form.data.sku}
                  onChange={e => form.setData('sku', e.target.value)}
                  placeholder="Enter unique SKU"
                />
                {form.errors.sku && (
                  <p className="text-sm text-red-600">{form.errors.sku}</p>
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
                {form.processing ? 'Creating...' : 'Create Crop'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CropCreate; 