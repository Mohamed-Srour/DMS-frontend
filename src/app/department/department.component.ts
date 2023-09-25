import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Department } from '../model/Department';
import { DepartmentService } from '../service/department.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{

  // userName; 
  // formdata;
  // ngOnInit() { 
  //    this.formdata = new FormGroup({ 
  //       userName: new FormControl("Tutorialspoint")
  //    }); 
  // } 
  // onClickSubmit(data) {this.userName = data.userName;}

  // code;
  // name;
  // description;
  formdata;
  department: Department = new Department;
  constructor(
    private departmentService: DepartmentService,
    private _formBuilder: FormBuilder
    ){}
  ngOnInit(){
      this.formdata=new FormGroup({
        code:new FormControl(null),
        name:new FormControl(null),
        description:new FormControl(null)
      })
  }
  onClickSubmit(data)
  {
    this.initdepartmentForm();
    this.department.code=data.code;
    this.department.name=data.name;
    this.department.description=data.description;
    // console.log(this.department);
    this.departmentService.saveDepartment(this.department).subscribe((response) => {
      // console.log(response);
      Swal.fire(response.message);
    },errorresponse=>{
      Swal.fire(errorresponse.error.message);
      
    });
  }

  OnClear() {
    this.department = new Department;
    
  }
  initdepartmentForm() {
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
}
