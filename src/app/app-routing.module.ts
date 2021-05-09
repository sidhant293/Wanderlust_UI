import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './service/login-guard.service';

const routes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'home/:userId',component:HomeComponent},


  //for login
  { path: 'login', component: LoginComponent },

  //handlers for empty path and catch all
  { path: '',component:HomeComponent },
  { path: "**",redirectTo:"",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
