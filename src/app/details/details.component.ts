import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  detArr:any=null

  constructor(private _ActivatedRoute:ActivatedRoute,private _DataService:DataService,private _CartService:CartService){

    _ActivatedRoute.params.subscribe((e)=>{
      let id =e['id']
      _DataService.getId(id).subscribe((e)=>{

        this.detArr=e.data
        console.log(this.detArr)

      })
    })

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: true
  }

  addProd(id:string){
    this._CartService.addCart(id).subscribe({
      next:(e)=>{

        if(e.status =="success"){
          this._CartService.cartCount.next(e.numOfCartItems)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title:`${e.message} you have ${e.numOfCartItems}` ,
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
