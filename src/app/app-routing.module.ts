import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalessidemenuComponent } from './components/salessidemenu/salessidemenu.component';
import { ProductsComponent } from './components/products/products.component';
import {OrdermanagementComponent} from './components/ordermanagement/ordermanagement.component';


const routes: Routes = [
  { path: 'salessidemenu', component: SalessidemenuComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'vieworder', component: OrdermanagementComponent }

 

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
   
  })


export class AppRoutingModule {

  
 }
