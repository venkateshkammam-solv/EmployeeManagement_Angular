
export interface Employee {
  id: string;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Department: string;
  Role: string;
  Age : number,
  DateOfBirth : string;
  DateOfJoining: string; 
  EmploymentType: string;
  ReportingManager: string;
  Location: string;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface AddEmployeeRequest {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  role: string;
  age : number,
  DateOfBirth : string;
  dateOfJoining: string;
  employmentType: string;
  reportingManager: string;
  location: string;
}
