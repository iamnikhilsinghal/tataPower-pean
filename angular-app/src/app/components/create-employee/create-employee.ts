import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.scss',
})
export class CreateEmployee {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      fname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      const newEmp = this.employeeForm.value;
      console.log('newEmp', newEmp);
      // api call edit
      this.employeeForm.reset();
    }
  }
}
