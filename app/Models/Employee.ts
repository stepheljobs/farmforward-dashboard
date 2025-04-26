export interface Employee {
  lastName: string;
  firstName: string;
  middleInitial: string;
  employeeId: number;
  position: string;
  email: string;
  phoneNumber: string;
  address: {
    sitio: string;
    barangay: string;
    city: string;
    province: string;
  };
  employmentStatus: string;
  dateHired: Date;
  dateSeparated?: Date;
} 