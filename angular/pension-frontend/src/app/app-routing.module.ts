import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component'
import { LoginComponent } from './components/login/login.component';
import { PensiondetailsComponent } from './components/pensiondetails/pensiondetails.component';

const routes: Routes = [{
  path: "",
  component: LoginComponent
}, {
  path:"register",
  component: RegistrationComponent
}, {
  path:"home",
  component: PensiondetailsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
