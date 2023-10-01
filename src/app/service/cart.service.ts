import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount=new BehaviorSubject(0);

  baseUrl:string=`https://ecommerce.routemisr.com`;
  headerData:any={
    token:localStorage.getItem("token")
  }

  constructor(private _HttpClient:HttpClient) {
    this.getLoggedCart().subscribe({
      next:(e)=>{
        console.log(e)
        this.cartCount.next(e.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addCart(id:string):Observable<any>{
   return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,{
      productId:id
    })
  }
  getLoggedCart():Observable<any>{
   return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`)
  }
  removeCart(id:string):Observable<any>{
   return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`)
  }

  updateCart(id:string,count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${id}`,{
      count:count
     })
   }

   checkCart(id:string,shippingAddress:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
      shippingAddress:shippingAddress
     })
   }
}
