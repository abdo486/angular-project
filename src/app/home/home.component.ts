import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import { WishlistService } from '../service/wishlist.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.scss']
})
export class HomeComponent {

  arrcate:any[]=[]
  arrprod:any[]=[]
  arrbrands:any[]=[]

  user:any=""
  countHome:number=0
  constructor(private _DataService:DataService,private _Auth:AuthService,private _CartService:CartService,
    private _WishlistService:WishlistService){
    this.getcategories()
    this.getproducts()
    this.getbrands()
    this.user=this._Auth.userData

    console.log(this._Auth.userData)



  }

  getcategories(){
    return this._DataService.getdata('categories').subscribe((r)=>{
      console.log(r.data)
      this.arrcate=r.data
    })
  }

  getproducts(){
    return this._DataService.getdata('products').subscribe((r)=>{
      console.log(r.data)
      this.arrprod=r.data.slice(0,8)
    })
  }
  getbrands(){
    return this._DataService.getdata('brands').subscribe((r)=>{
      console.log(r.data)
      this.arrbrands=r.data.slice(0,4)
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      400: {
        items: 3
      },
      500: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
     },
    nav: true
  }

  addProd(id:string){
    this._CartService.addCart(id).subscribe({
      next:(e)=>{

        if(e.status =="success"){
          this._CartService.cartCount.next(e.numOfCartItems)


          Swal.fire({
            icon: 'success',
            title:`${e.message} you have ${e.numOfCartItems}` ,

          })
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })


  }

  addProdWishlist(id:string){
    this._WishlistService.addWishlist(id).subscribe({
      next:(e)=>{
        console.log(e)
        if(e.status =="success"){

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:`${e.message}` ,
            showConfirmButton: false,
            timer: 1500
          })
        }


      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

}
