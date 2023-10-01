import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  constructor(private _Auth:AuthService,private _Router:Router){

  }
resetMessage:string=""

  forgetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])

  })

  forgetpasswordsubmit(form:FormGroup){
    console.log(form.value)
    this._Auth.forgetSubmit(form.value).subscribe({
      next:(e)=>{
        console.log(e)
        if(e.statusMsg == 'success'){
          document.querySelector(".reset")?.classList.remove("d-none")
          document.querySelector(".forgetform")?.classList.add("d-none")
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })


  }

 ResetPass:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern('[0-9]+')])
 })
 Resetpasssubmit(form:FormGroup){
  console.log(form.value)
  this._Auth.verifyResetCode(form.value).subscribe({
    next:(e)=>{
      console.log(e)
      if(e.status=="Success"){
        this._Router.navigate(['/resetPassword'])

      }

    },
   error:(err)=>{
    console.log(err.error.message)
    this.resetMessage=err.error.message
   }
  })

 }

}
