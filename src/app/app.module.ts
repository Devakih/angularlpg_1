import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Http, HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';


import { AppComponent } from './app.component';
import {ProductsComponent} from './components/products/products.component';
import {SearchProductPipe} from './services/searchproductpipe.service';
import {SearchOrderPipe} from './services/searchorderpipe.service';
import { AppRoutingModule } from './/app-routing.module';
import { SalessidemenuComponent } from './components/salessidemenu/salessidemenu.component';
import { OrdermanagementComponent } from './components/ordermanagement/ordermanagement.component';
import {OrderDetailsComponent} from './components/ordermanagement/orderdetails.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SearchProductPipe,
    SearchOrderPipe,
    SalessidemenuComponent,
    OrdermanagementComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
