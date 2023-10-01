import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl:string=`https://ecommerce.routemisr.com`

  constructor(private _HttpClient:HttpClient) { }
  addWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
    {productId:id})
  }

  getLoggedWishlist():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`)

  }
  removeProdWish(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`)


  }
}
