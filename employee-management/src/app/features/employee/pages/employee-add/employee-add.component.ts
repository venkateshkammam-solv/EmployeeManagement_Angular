import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { AddEmployeeRequest } from '../../../../models/employee.model';
import { calculateAge } from '../../../../shared/utils/date.util';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {

  employeeForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {

    this.employeeForm = this.fb.group({
      id: [''],

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
          Validators.pattern(/^(\+91[\s]?)?[0-9]{10}$/)
        ]
      ],

      department: ['', Validators.required],

      role: ['', Validators.required],

      DateOfBirth: ['', Validators.required],

      Age: [{ value: '', disabled: true }],   

      dateOfJoining: ['', Validators.required],
      employmentType: ['', Validators.required],
      reportingManager: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.employeeForm.get('DateOfBirth')?.valueChanges.subscribe(dob => {
      if (dob) {
        const age = calculateAge(dob);
        this.employeeForm.get('Age')?.setValue(age);
      }
    });
  }

  submitForm() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const request: AddEmployeeRequest = this.employeeForm.getRawValue(); // includes disabled fields

    this.isSubmitting = true;

    this.employeeService.addEmployee(request).subscribe({
      next: () => {
        alert('Employee added successfully!');
        this.router.navigate(['/employees']);
      },
      error: () => {
        alert('Failed to add employee');
        this.isSubmitting = false;
      }
    });
  }
}
