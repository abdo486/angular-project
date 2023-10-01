import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../service/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  prodId:string=""
  constructor(private _CartService:CartService){

  }
  ngOnInit(): void {
    this._CartService.getLoggedCart().subscribe({
      next:(e)=>{
      this.prodId=e.data._id
      }
    })
  }
checkForm:FormGroup=new FormGroup({
  details:new FormControl(null),
  phone:new FormControl(null),
  city:new FormControl(null)
})
payPage(url:string){
  window.location.href=url
}
checkPay(form:FormGroup){
  console.log(form)
  this._CartService.checkCart(this.prodId,form.value).subscribe({
    next:(e)=>{
      if(e.status=="success"){
       this.payPage(e.session.url)

      }
      console.log(e)
    }
  })

}
}
