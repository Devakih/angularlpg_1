import { Component,Input,OnInit } from '@angular/core';
import { Order } from '../products/products.component';
import {LineItem} from  '../products/products.component';

@Component({
    selector: 'order-details',
    templateUrl: './orderdetails.component.html',
})
export class OrderDetailsComponent  implements OnInit{

    @Input() orderObject: Order;
    //lineitems: LineItem[] = [];
    
        constructor(){

            console.log("constructor in Object::"+this.orderObject.orderId);

        }   
        ngOnInit(){

        }
    }