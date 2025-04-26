import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';

const EmployeeCreate: React.FC = () => {
  const form = useForm({
    name: '',
    employee_id: '',
    position: '',
    email: '',
    phone_number: '',
    address: '',
    employment_status: 'Active',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('employees.store'));
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Employees', href: route('employees.index') }]}>
      <Head title="Create Employee" />
      
      <div className="mb-6">
        <Link href={route('employees.index')}>
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Employees
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter employee name"
                  value={form.data.name}
                  onChange={e => form.setData('name', e.target.value)}
                />
                {form.errors.name && (
                  <p className="text-sm text-red-600">{form.errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  type="number"
                  placeholder="Enter employee ID"
                  value={form.data.employee_id}
                  onChange={e => form.setData('employee_id', e.target.value)}
                />
                {form.errors.employee_id && (
                  <p className="text-sm text-red-600">{form.errors.employee_id}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Enter position"
                  value={form.data.position}
                  onChange={e => form.setData('position', e.target.value)}
                />
                {form.errors.position && (
                  <p className="text-sm text-red-600">{form.errors.position}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.target.value)}
                />
                {form.errors.email && (
                  <p className="text-sm text-red-600">{form.errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  placeholder="Enter phone number"
                  value={form.data.phone_number}
                  onChange={e => form.setData('phone_number', e.target.value)}
                />
                {form.errors.phone_number && (
                  <p className="text-sm text-red-600">{form.errors.phone_number}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employment_status">Employment Status</Label>
                <Select
                  value={form.data.employment_status}
                  onValueChange={value => form.setData('employment_status', value)}
                >
                  <SelectTrigger id="employment_status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
                {form.errors.employment_status && (
                  <p className="text-sm text-red-600">{form.errors.employment_status}</p>
                )}
              </div>
              
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  value={form.data.address}
                  onChange={e => form.setData('address', e.target.value)}
                />
                {form.errors.address && (
                  <p className="text-sm text-red-600">{form.errors.address}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={form.processing}>
                {form.processing ? 'Creating...' : 'Create Employee'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default EmployeeCreate; 