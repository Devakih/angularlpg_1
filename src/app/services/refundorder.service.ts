import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {RefundOrder} from '../model/refundorder.model';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class RefundOrderService{
    constructor(private http: Http){
        console.log("RefundOrderService Init");
    }

    submitRefund(refundorder:RefundOrder)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })
        console.log("Submitting RefundOrder");
        console.log("Sending Order:::"+refundorder.orderStat);
        console.log("LineItems Order:::"+refundorder.refundlineItemlist[0].lineItemDesc);
        return this.http.post("http://localhost:8080/lpg/entry/refundorder", refundorder, options).map(res => res.status);
    }
}