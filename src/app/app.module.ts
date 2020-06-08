import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BaseRequestOptions, Http, HttpModule} from "@angular/http";
import { CustomerComponentComponent } from './customer-component/customer-component.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import {RouterModule} from "@angular/router";
import {LoginFormComponent} from "./login-form/login-form.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CustomerComponentComponent,
    NavbarComponentComponent
  ],
  imports: [

    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'login',component:LoginFormComponent },
      {path:'customers',component:CustomerComponentComponent},
    ])
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
