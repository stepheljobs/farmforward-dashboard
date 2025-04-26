import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon, PencilIcon } from 'lucide-react';
import { Employee } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Props {
  employee: Employee;
}

const EmployeeShow: React.FC<Props> = ({ employee }) => {
  return (
    <AppLayout breadcrumbs={[{ title: 'Employees', href: route('employees.index') }]}> 
    <div className="container py-8">
      <Head title={`Employee: ${employee.name}`} />
      
      <div className="mb-6 flex justify-between items-center">
        <Link href={route('employees.index')}>
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Employees
          </Button>
        </Link>
        
        <Link href={route('employees.edit', employee.id)}>
          <Button variant="outline" size="sm">
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-lg font-semibold">{employee.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
              <p className="mt-1 text-lg font-semibold">{employee.employee_id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Position</h3>
              <p className="mt-1 text-lg">{employee.position}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg">
                <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline">
                  {employee.email}
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              <p className="mt-1 text-lg">
                <a href={`tel:${employee.phone_number}`} className="text-blue-600 hover:underline">
                  {employee.phone_number}
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employment Status</h3>
              <p className="mt-1">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  employee.employment_status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {employee.employment_status}
                </span>
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="mt-1 text-lg">{employee.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </AppLayout>
  );
};

export default EmployeeShow; 