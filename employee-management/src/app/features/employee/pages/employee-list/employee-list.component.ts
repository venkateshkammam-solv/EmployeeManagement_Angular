import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  errorMsg = '';
  isReadonly = false;

  constructor(private employeeService: EmployeeService, public router: Router) {}
  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMsg = '';
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data ?? [];
        console.log(this.employees);
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  // navigation to add/edit - edit will be implemented next step
  goToAdd(): void {
    this.router.navigate(['/employee/add']);
  }

  goToEdit(id: string) {
    this.router.navigate([`/employee/edit/${id}`]);
  }

  onDeleteClicked(id: string) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully!');
        this.loadEmployees(); // reload the list
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete employee');
      }
    });
  }
}
