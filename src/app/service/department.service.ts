import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../model/Department';
import { ResponseViewModel } from '../model/ResponseViewModel';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  saveDepartment(department:Department):Observable<ResponseViewModel>
  {
    return this.http.post<ResponseViewModel>("http://localhost:8080/task/department/save" ,department);
  }
}
