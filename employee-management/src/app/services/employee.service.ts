import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddEmployeeRequest, Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:7295/api';

  constructor(private http: HttpClient) {}

  addEmployee(request: AddEmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/AddEmployeeDetails`, request);
  }

  getAllEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.baseUrl}/employeeDetails`); 
}
deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteEmployeeDataById/${id}`);
  }

  updateEmployee(id: string, request: AddEmployeeRequest): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateEmployeeDetailsById/${id}`, request);
}

getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employeeDetails/${id}`);
  }

}
