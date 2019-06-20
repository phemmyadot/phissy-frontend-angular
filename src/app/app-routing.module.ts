import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnBoardingComponent } from './components/on-boarding/on-boarding.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: OnBoardingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
