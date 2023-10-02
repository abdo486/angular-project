import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';
import { WishlistService } from '../service/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  arrprod:any[]=[]
  searchValue:string=""

  constructor(private _DataService:DataService,private _Auth:AuthService,private _CartService:CartService
    ,private _WishlistService:WishlistService){
    this.getproducts()



  }


  getproducts(){
    return this._DataService.getdata('products').subscribe((r)=>{

      this.arrprod=r.data



    })
  }

  addProd(id:string){
    this._CartService.addCart(id).subscribe({
      next:(e)=>{

        if(e.status =="success"){
          this._CartService.cartCount.next(e.numOfCartItems)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:`${e?.message} you have ${e?.numOfCartItems}` ,
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



