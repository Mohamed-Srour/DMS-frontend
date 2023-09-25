import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  employeeFormGroup!: FormGroup;

  constructor(
    private _service: EmployeeService,
    private _formBuilder: FormBuilder
  ) {}

  employee: Employee = new Employee();
  employees: Employee[] = [];

  ngOnInit(): void {
    this.initemployeeForm();
    this._service.employeeFilter(this.employee).subscribe((response) => {
      this.employees = response.data;
    });
  }

  initemployeeForm() {
    this.employeeFormGroup = this._formBuilder.group({
      name: ['',Validators.required],
      employee_code: ['',Validators.required],
      department_code: ['',Validators.required],
      birthDate: ['',Validators.required],
      address:['',Validators.required],
      salary:['',[Validators.required,Validators.pattern("^-?\d*\.\d+$")]],
      phone:['',Validators.required]
    });
  }

  getFormValidationErrors(){
    Object.keys(this.employeeFormGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.employeeFormGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
        let erroeMessage ="";  
      let data=this.employeeFormGroup.getRawValue();
        if(data.code==null||key=="code")
        {
          erroeMessage+="Code ";
        }
        if(data.name==null||key=="name")
        {
          erroeMessage+="Name ";
        }
        if(data.salary==null||key=="salary")
        {
          erroeMessage+="Salary and it must be Double value";
        }
        if(data.department==null||key=="department")
        {
          erroeMessage+="Department ";
        }
        Swal.fire('please enter valid '+erroeMessage);
        });
      }
    });
  }

  OnSubmit() {
    
    this.employee = this.employeeFormGroup.value as Employee;
    this._service.employeeFilter(this.employee).subscribe((response) => {
      this.employees = response.data;
    });
  }
  OnClear() {
    this.employee = new Employee;
    this._service.employeeFilter(this.employee).subscribe((response) => {
      this.employees = response.data;
    });
  }

  get employeeForm() {
    return this.employeeFormGroup.controls;
  }
}
