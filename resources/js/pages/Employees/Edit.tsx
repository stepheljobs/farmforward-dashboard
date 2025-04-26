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
import { Employee } from '@/types';

interface Props {
  employee: Employee;
}

const EmployeeEdit: React.FC<Props> = ({ employee }) => {
  const form = useForm({
    last_name: employee.last_name,
    first_name: employee.first_name,
    middle_initial: employee.middle_initial || '',
    employee_id: employee.employee_id.toString(),
    position: employee.position,
    email: employee.email,
    phone_number: employee.phone_number,
    address_sitio: employee.address_sitio,
    address_barangay: employee.address_barangay,
    address_city: employee.address_city,
    address_province: employee.address_province,
    employment_status: employee.employment_status,
    date_hired: employee.date_hired ? new Date(employee.date_hired).toISOString().split('T')[0] : '',
    date_separated: employee.date_separated ? new Date(employee.date_separated).toISOString().split('T')[0] : '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.put(route('employees.update', employee.id));
  };

  return (
    <AppLayout breadcrumbs={[
      { title: 'Employees', href: route('employees.index') },
      { title: 'Edit', href: route('employees.edit', employee.id) }
    ]}>
      <Head title="Edit Employee" />
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Link href={route('employees.index')}>
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Employee</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={form.data.last_name}
                    onChange={e => form.setData('last_name', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.last_name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={form.data.first_name}
                    onChange={e => form.setData('first_name', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.first_name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="middle_initial">Middle Initial</Label>
                  <Input
                    id="middle_initial"
                    value={form.data.middle_initial}
                    onChange={e => form.setData('middle_initial', e.target.value)}
                    className="mt-1"
                    maxLength={1}
                  />
                  {form.errors.middle_initial && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.middle_initial}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="employee_id">Employee ID</Label>
                  <Input
                    id="employee_id"
                    value={form.data.employee_id}
                    onChange={e => form.setData('employee_id', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.employee_id && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.employee_id}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={form.data.position}
                    onChange={e => form.setData('position', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.position && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.position}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.data.email}
                    onChange={e => form.setData('email', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={form.data.phone_number}
                    onChange={e => form.setData('phone_number', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.phone_number && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.phone_number}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="address_sitio">Sitio/Purok/Street/Subdivision</Label>
                    <Input
                      id="address_sitio"
                      value={form.data.address_sitio}
                      onChange={e => form.setData('address_sitio', e.target.value)}
                      className="mt-1"
                    />
                    {form.errors.address_sitio && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.address_sitio}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address_barangay">Barangay</Label>
                    <Input
                      id="address_barangay"
                      value={form.data.address_barangay}
                      onChange={e => form.setData('address_barangay', e.target.value)}
                      className="mt-1"
                    />
                    {form.errors.address_barangay && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.address_barangay}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address_city">City/Municipality</Label>
                    <Input
                      id="address_city"
                      value={form.data.address_city}
                      onChange={e => form.setData('address_city', e.target.value)}
                      className="mt-1"
                    />
                    {form.errors.address_city && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.address_city}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address_province">Province</Label>
                    <Input
                      id="address_province"
                      value={form.data.address_province}
                      onChange={e => form.setData('address_province', e.target.value)}
                      className="mt-1"
                    />
                    {form.errors.address_province && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.address_province}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="employment_status">Employment Status</Label>
                  <Select
                    value={form.data.employment_status}
                    onValueChange={value => form.setData('employment_status', value)}
                  >
                    <SelectTrigger id="employment_status" className="mt-1">
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
                    <p className="text-red-500 text-sm mt-1">{form.errors.employment_status}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="date_hired">Date Hired</Label>
                  <Input
                    id="date_hired"
                    type="date"
                    value={form.data.date_hired}
                    onChange={e => form.setData('date_hired', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.date_hired && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.date_hired}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="date_separated">Date Separated</Label>
                  <Input
                    id="date_separated"
                    type="date"
                    value={form.data.date_separated}
                    onChange={e => form.setData('date_separated', e.target.value)}
                    className="mt-1"
                  />
                  {form.errors.date_separated && (
                    <p className="text-red-500 text-sm mt-1">{form.errors.date_separated}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Link href={route('employees.index')}>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={form.processing}>
                  {form.processing ? 'Saving...' : 'Update Employee'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EmployeeEdit; 