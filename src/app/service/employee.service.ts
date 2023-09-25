import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs';
import { ResponseViewModel } from '../model/ResponseViewModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  saveEmployee(employee:Employee):Observable<ResponseViewModel>
  {
    
    return this.http.post<ResponseViewModel>("http://localhost:8080/task/employee/save",employee);
  }
  getAllEmployees():Observable<ResponseViewModel>
  {
    return this.http.get<ResponseViewModel>("http://localhost:8080/task/employee/getAll");
  }
  employeeFilter(employee:Employee): Observable<any> {
    console.log("in function get all " , employee);
      return this.http.post<any>("http://localhost:8080/task/employee/search" ,employee);
    }
}
