import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartNum:number=0
  constructor(private _Auth:AuthService,private _CartService:CartService){
    _CartService.cartCount.subscribe({
      next:(e)=>{
        console.log(e)
        this.cartNum=e
      }
    })
  }

  isLogin:any=null
  logOut(){
    this._Auth.logout()
  }
ngOnInit(): void {
  this._Auth.userData.subscribe({
    next:(e)=>{
      console.log(e)
      this.isLogin=e
    }
  })


}



}
