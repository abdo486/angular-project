import { Component } from '@angular/core';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
 catarr:any[]=[]

  constructor(private _DataService:DataService){
this.getcate()

  }
  getcate(){
   return this._DataService.getdata("categories").subscribe({
      next:(e)=>{
        console.log(e)
        this.catarr=e.data
      }
    })
  }





}
