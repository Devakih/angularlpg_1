import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Order} from '../components/products/products.component';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class OrderService{
    constructor(private http: Http){
        console.log("Order Service Init");
    }

    private headers = new Headers({"Content-Type" : "application/json"});

    getOrderbyId(orderId)
    {
        console.log("Getting orders by Id" + orderId);
        return this.http.get(`http://localhost:8080/lpg/entry/order/${orderId}`).map(res => res.json());
    }
    
    getOrderbyDate(orderDate:Date)
    {
        console.log("Getting orders by date" + orderDate);
        return this.http.get(`http://localhost:8080/lpg/entry/order/${orderDate}`).map(res => res.json());
    }

    deleteOrderById(orderId: number)
    {
       
        console.log("Deleting orders by ID  " + orderId);
        return this.http.delete(`http://localhost:8080/lpg/entry/order/${orderId}`, {headers : this.headers}).map(res => 
        console.log(res.status));
        
    }

        
}