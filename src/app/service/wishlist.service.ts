import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl:string=`https://ecommerce.routemisr.com`;
  headerData:any={
    token:localStorage.getItem("token")
  }

  constructor(private _HttpClient:HttpClient) { }
  addWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
    {productId:id},{headers:this.headerData})
  }

  getLoggedWishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,{headers:this.headerData})

  }
  removeProdWish(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`,{headers:this.headerData})


  }
}
