import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {QuotationComponent} from './quotation/quotation.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'register', component: RegisterComponent},
  {path : 'login', component: LoginComponent},
  {path: 'quotation', component: QuotationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
