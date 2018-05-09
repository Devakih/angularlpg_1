import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Order} from '../components/products/products.component';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ProductService{
    constructor(private http: Http){
        console.log("ProductService Init");
    }

    getProducts()
    {
        console.log("Getting products");
        return this.http.get("http://localhost:8080/lpg/entry/product").map(res => res.json());
    }
    crerateOrder(order:Order)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })
        console.log("Creating Order");
        console.log("Sending Order:::"+order.orderStat);
        console.log("LineItems Order:::"+order.lineItemlist[0].lineItemDesc);
        return this.http.post("http://localhost:8080/lpg/entry/order", order, options).map(res => res.status);
    }
    
}
 