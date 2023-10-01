import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseurl:string='https://ecommerce.routemisr.com/api/v1/'
  constructor(private _HttpClient:HttpClient) { }

  getdata(d:string):Observable<any>{

    return this._HttpClient.get(this.baseurl+d)
  }
  getId(d:string):Observable<any>{

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${d}`)
  }


}
