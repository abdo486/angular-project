import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
Router


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private _Auth:AuthService,private _Router:Router){

  }
  loading:boolean=false

  errMessage:string =""
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9@]{3,8}/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9@]{3,8}/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}/)])


  },{validators:this.rePassword})

  rePassword(form:any){
    let pass = form.get("password")
    let repass = form.get("rePassword")

    if(pass?.value == repass?.value ){
      return null
    }else{
      repass?.setErrors({repass:"repass is not match"})
      return {repass:"repass is not match"}
    }

  }

  signup(data:FormGroup){
    this.loading=true

    this._Auth.register(data.value).subscribe(
      {
        next:(r)=>{
          console.log(r.message)
          if(r.message == 'success'){
            this._Router.navigate(['/login'])
            this.loading=false

          }

        },
        error:(err)=>{
          this.errMessage=err.error.message
          console.log(err.error)
          this.loading=false

        }

      }


    )


  }

}
