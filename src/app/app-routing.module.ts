import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { MycartComponent } from './mycart/mycart.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"home",canActivate:[authGuard],component:HomeComponent},
  {path:"categories",canActivate:[authGuard],component:CategoryComponent},
  {path:"brands",canActivate:[authGuard],component:BrandsComponent},
  {path:"products",canActivate:[authGuard],component:ProductsComponent},
  {path:"wishlist",canActivate:[authGuard],component:WishlistComponent},
  {path:"profile",canActivate:[authGuard],component:ProfileComponent},
  {path:"cart",canActivate:[authGuard],component:MycartComponent},
  {path:"details/:id",canActivate:[authGuard],component:DetailsComponent},
  {path:"check",canActivate:[authGuard],component:CheckoutComponent},
  {path:"forgetpassword",component:ForgetpasswordComponent},
  {path:"resetPassword",component:ResetPasswordComponent},
  {path:"signup",component:SignupComponent},
  {path:"login",component:SigninComponent},

  {path:"**",component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
