import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './location/location.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { StanjeZagadenjaComponent } from './stanje-zagadenja/stanje-zagadenja.component';
import { PhoneComponent } from './phone/phone.component';
import { HeaderComponent } from './header/header.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { PocetakBackComponent } from './pocetak-back/pocetak-back.component'


@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    PocetnaComponent,
    SignUpComponent,
    LogInComponent,
    StanjeZagadenjaComponent,
    PhoneComponent,
    HeaderComponent,
    UserSearchComponent,
    PocetakBackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
