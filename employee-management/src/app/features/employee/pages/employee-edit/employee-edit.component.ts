import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { AddEmployeeRequest, Employee } from '../../../../models/employee.model';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {
  employeeForm!: FormGroup;
  isSubmitting = false;
  employeeId!: string;
  isReadonly = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
       fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z ]+$/),
          Validators.maxLength(100)
        ]
      ],
       email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
        ]
      ],
       phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
      department: ['', Validators.required],
      role: ['', Validators.required],
      Age: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      employmentType: ['', Validators.required],
      reportingManager: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.isReadonly = this.route.snapshot.data['isReadonly'] ?? false;

    this.loadEmployee();

    if (this.isReadonly) {
      this.employeeForm.disable();
    }
  }

  loadEmployee() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (emp: Employee) => {
        this.employeeForm.patchValue({
          fullName: emp.FullName,
          email: emp.Email,
          phoneNumber: emp.PhoneNumber,
          department: emp.Department,
          role: emp.Role,
          Age: emp.Age,                                 
          DateOfBirth: emp.DateOfBirth.split('T')[0],   
          dateOfJoining: emp.DateOfJoining.split('T')[0],
          employmentType: emp.EmploymentType,
          reportingManager: emp.ReportingManager,
          location: emp.Location
        });
      },
      error: err => console.error(err)
    });
  }

  submitForm() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const request: AddEmployeeRequest = this.employeeForm.value;
    this.isSubmitting = true;
    this.employeeService.updateEmployee(this.employeeId, request).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        alert('Failed to update employee');
        this.isSubmitting = false;
      }
    });
  }
}
