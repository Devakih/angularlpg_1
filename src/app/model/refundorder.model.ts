import {RefundLineItem} from '../model/refundlineitem.model';

export class RefundOrder
{
   refundlineItemlist : RefundLineItem[] = [];
   refundorderId:number;
   orderId:number;
   custId:number;
   orderAmt:number;
   orderStat:String;
   orderDate: Date;
}