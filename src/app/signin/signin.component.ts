import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private _Auth:AuthService,private _Router:Router){

  }
  loading:boolean=false
  errMessage:string =""
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9@]{3,8}/)]),
  })

  login(data:FormGroup){
    this.loading=true
    console.log(data.value)

    this._Auth.loginSubmit(data.value).subscribe({
      next:(e)=>{
        this._Auth.saveData(e.user)
        console.log(e.user)
       if(e.message =='success'){
        this._Router.navigate(['/home'])
        localStorage.setItem("token",e.token)
        this.loading=false

       }


      },
      error:(err)=>{
        console.log(err)
        this.errMessage=err.error?.message
        this.loading=false
      }
    })




  }

}
