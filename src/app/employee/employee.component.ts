import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/Employee';
import { Department } from '../model/Department';
import Swal from 'sweetalert2';
import { ValidationErrors } from '@angular/forms';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  formdata;
  employee:Employee=new Employee;
  department:Department=new Department;
  employees: Employee[] = [];
  constructor(
    private employeeService:EmployeeService,
    private _formBuilder: FormBuilder,
  ){}

  ngOnInit() {
    
    this.initemployeeForm();
      this.formdata=new FormGroup({
        code:new FormControl(null,[Validators.required,Validators.minLength(1)]),
        name:new FormControl(null,[Validators.required,Validators.minLength(1)]),
        phone:new FormControl(null),
        salary:new FormControl(null,[Validators.required,Validators.pattern(/^-?\d*\.\d+$/)]),
        department:new FormControl(null,[Validators.required,Validators.minLength(1)]),
        birthDate:new FormControl(null),
        address:new FormControl(null)
      })
  }

  
  getFormValidationErrors(){
    Object.keys(this.formdata.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.formdata.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
        let erroeMessage ="";  
      let data=this.formdata.getRawValue();
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
  onClickSubmit(data)
  {
    if(this.formdata.invalid){
    this.getFormValidationErrors();
    return;
    }
    this.employee.code=data.code;
    this.employee.name=data.name;
    this.employee.address=data.address;
    this.employee.birth_date=data.birthDate;
    this.employee.mobile=data.phone;
    this.employee.salary=data.salary;
    this.department.code=data.department;
    this.employee.department=this.department;
    console.log(this.employee.salary);

    this.employeeService.saveEmployee(this.employee).subscribe((response) => {
      Swal.fire(response.message);

    }
    ,errorresponse=>{
      Swal.fire(errorresponse.error.message);
      
    }
    );
  }
  OnClear() {
    this.employee = new Employee;
    
  }
  initemployeeForm() {
    this.formdata = this._formBuilder.group({
      name: [''],
      code: [''],
      department: [''],
      birthDate: [''],
      address:[''],
      salary:[''],
      phone:['']
    });
  }
  add=1;
  allEmployees()
  {
    this.employeeService.getAllEmployees().subscribe((response)=>{
      // this.employees=response.data.birth_date+1;
      this.employees=response.data;
    });
  }
}
