import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  brl:string="https://ecommerce.routemisr.com/api"
  userData:BehaviorSubject<any> = new BehaviorSubject(null)

  saveData(x:any){
    this.userData.next(x)


  }

  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem("token")){
      let token :string|null = localStorage.getItem("token")
      if(token != null){
        let data = jwtDecode(token)
        this.saveData(data)

      }

    }
   }
  register(formData:any):Observable<any>{
    return this._HttpClient.post(`${this.brl}/v1/auth/signup`,formData)
  }
  loginSubmit(formData:any):Observable<any>{
    return this._HttpClient.post(`${this.brl}/v1/auth/signin`,formData)
  }
  forgetSubmit(formData:any):Observable<any>{
    return this._HttpClient.post(`${this.brl}/v1/auth/forgotPasswords`,formData)
  }
  resetPassSubmit(formData:any):Observable<any>{
    return this._HttpClient.put(`${this.brl}/v1/auth/resetPassword`,formData)
  }
  verifyResetCode(formData:any):Observable<any>{
    return this._HttpClient.post(`${this.brl}/v1/auth/verifyResetCode`,formData)
  }

  logout(){
    localStorage.removeItem("token")
    this._Router.navigate(["/login"])
    this.saveData(null)
  }
}
