import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  constructor(private _CartService:CartService){

  }
  cartArr:any;
  ngOnInit(): void {
    this.getCart()
  }


  getCart(){
    this._CartService.getLoggedCart().subscribe({
      next:(e)=>{
        console.log(e.data)
        this.cartArr=e.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  deleteCart(id:string){
    this._CartService.removeCart(id).subscribe({
      next:(e)=>{
        console.log(e.data)
        this.cartArr=e.data
        this._CartService.cartCount.next(e.numOfCartItems)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  updateCart(id:string,count:number){
    this._CartService.updateCart(id,count).subscribe({
      next:(e)=>{
        console.log(e.data)
        this.cartArr=e.data;



      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}
