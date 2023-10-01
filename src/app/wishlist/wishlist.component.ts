import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../service/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistProd:any
  constructor(private _WishlistService:WishlistService) {

  }
  ngOnInit(): void {
    this.getProd()

  }
  getProd(){
    return this._WishlistService.getLoggedWishlist().subscribe({
      next:(e)=>{
        console.log(e.data)
        this.wishlistProd=e.data

      },
      error:(err)=>{console.log(err)}
    })
  }

  deleteWish(id:string){
    this._WishlistService.removeProdWish(id).subscribe({
      next:(e)=>{
        console.log(e)
        this.getProd()

      },
      error:(err)=>{
        console.log(err)
      }

    })
  }

}
