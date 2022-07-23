import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PhoneComponent } from './phone/phone.component';
import { StanjeZagadenjaComponent } from './stanje-zagadenja/stanje-zagadenja.component';

const routes: Routes = [
  {path:"", component: PocetnaComponent},
  {path:"login", component: LogInComponent},
  {path:"signup", component: SignUpComponent},
  {path:"prijaviSmece", component: PhoneComponent},
  {path:"stanjeZagadenja", component: StanjeZagadenjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
