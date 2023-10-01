import { Component } from '@angular/core';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  arrbrands:any[]=[]
  constructor(private _DataService:DataService){
    this.getbrands()
  }

  getbrands(){
    return this._DataService.getdata('brands').subscribe((r)=>{
      console.log(r.data)
      this.arrbrands=r.data
    })
  }

}
