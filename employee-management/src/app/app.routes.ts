import { Routes } from '@angular/router';
import { EmployeeAddComponent } from './features/employee/pages/employee-add/employee-add.component';
import { EmployeeEditComponent } from './features/employee/pages/employee-edit/employee-edit.component';
export const routes: Routes = [
   {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employee/add',
    component: EmployeeAddComponent,

  },
  {
  path: 'employees',
  loadComponent: () =>
    import('./features/employee/pages/employee-list/employee-list.component')
      .then(m => m.EmployeeListComponent)
},
 {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
    data: { isReadonly: false }
  },

  { 
    path: 'employee/view/:id', 
    component: EmployeeEditComponent,
    data: { isReadonly: true }
  },
];
