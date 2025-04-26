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
import { PlusIcon, TrashIcon, PencilIcon, EyeIcon } from 'lucide-react';
import { Employee } from '@/types';

interface Props {
  employees: Employee[];
}

const EmployeeIndex: React.FC<Props> = ({ employees }) => {
  return (
    <AppLayout breadcrumbs={[{ title: 'Employees', href: route('employees.index') }]}>
      <Head title="Employees" />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employees</h1>
          <Link href={route('employees.create')}>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </Link>
        </div>

        <Table>
          <TableCaption>List of all employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No employees found. Create your first employee.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.employee_id}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone_number}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.employment_status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.employment_status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={route('employees.show', employee.id)}>
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={route('employees.edit', employee.id)}>
                      <Button variant="ghost" size="icon">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={route('employees.destroy', employee.id)} method="delete" as="button">
                      <Button variant="ghost" size="icon" className="text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </Link>
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

export default EmployeeIndex; 