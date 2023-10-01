import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private _Auth:AuthService,private _Router:Router){

  }

  ResetPass:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9@]{3,8}/)])
  })
  ResetPassSubmit(form:FormGroup){
    console.log(form.value)
    this._Auth.resetPassSubmit(form.value).subscribe({
      next:(e)=>{
        console.log(e)
        if(e.token){
          this._Router.navigate(['./login'])
        }

      },
      error:(err)=>{
        console.log(err)
      }

    })


  }

}
