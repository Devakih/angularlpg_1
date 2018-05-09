import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../components/products/products.component';
import {RefundOrder} from '../../model/refundorder.model';
import {RefundLineItem} from '../../model/refundlineitem.model';
import {OrderDetailsComponent} from '../ordermanagement/orderdetails.component'
import {LineItem} from '../../components/products/products.component';
import { RefundOrderService } from '../../services/refundorder.service';

@Component({
  selector: 'app-ordermanagement',
  templateUrl: `./ordermanagement.component.html`,
  providers : [OrderService,RefundOrderService]
})
export class OrdermanagementComponent implements OnInit {

    order: Order;
    orderAmt:number;
    orderId:number;
    orderDate:Date;
    orders:Order [] = [];
    lineItem: LineItem;
    lineitems: LineItem[] = [];
    gotOrderObj:boolean = false;
    currentDate:Date = new Date();
    lineItemlist:LineItem[] = [];
    selectedLink:String;
    deleteDone:boolean = false;
    showMsg:String;
   // isChecked:boolean;
   checkedLineItems:RefundLineItem[] = [];
   //private refundService : RefundOrderService;
   statusCode: number;
   onSave:boolean = false;

    constructor(private orderService : OrderService,private refundService: RefundOrderService)
    {
        
    }
    setradio(e: string): void   
    { 
        console.log("Selected Link=="+e) 
        if(e == "OrderNum")
             this.selectedLink = e; 
        else
            this.selectedLink = e;
           
    } 
    onSubmit()
    {
        console.log("Keyed in Mumber::"+this.orderId)

        if(this.selectedLink == "OrderNum")
        {

            this.orderService.getOrderbyId(this.orderId).subscribe(order => {
            this.order = order;
            console.log("order id:::"+this.order.orderId);
            console.log("order id:::"+this.order.lineItemlist[0].lineItemDesc);
            this.lineitems = this.order.lineItemlist;
            this.gotOrderObj = true;
          });
        }

        else(this.selectedLink == "OrderDt")
        {
           
            this.orderService.getOrderbyDate(this.orderDate).subscribe(orders => {
            this.orders = orders;
            if(this.orders.length == 0)
            {
                this.showMsg = "No Order Found For this Date!Please select another Date.";
                this.deleteDone = true;
            }
                                 
          });
        }

    }

    showOrderDetails(orderId: number)
    {
        console.log("OrderId :::" + orderId);
        this.orders.forEach(order => {
            console.log("order.orderId:::"+order.orderId);
            if(order.orderId == orderId)
            {
                this.order = order;
                this.lineitems = this.order.lineItemlist;
            }
        })
        this.gotOrderObj = true;
        //this.showMsg = "Order Saved!" 
    }

    onDelete(orderId: number)
    {
        console.log("OrderId onDelete:::" + orderId);
        this.orderService.deleteOrderById(orderId).subscribe(res => {
                this.deleteDone = true;
        });
        this.lineitems.splice(0,this.lineitems.length);
        this.gotOrderObj = false;
        this.showMsg = "Order Deleted!" 
        console.log("Deleted "+  this.deleteDone)
    }

    selectedLineItem(choosenLineItm: RefundLineItem)
    {
        console.log("Which check box is selected:::"+choosenLineItm.lineItemDesc);
        this.checkedLineItems.push(choosenLineItm);
        console.log("Selected Items::"+this.checkedLineItems.length);
    }

    getTotal():number {
    
        let total:number = 0;
        this.checkedLineItems.forEach(item => { 
          total = total + (item.lineItemUnTtlPrc)
        });
        return total;
      }

    onRefund()
    {
        console.log(" Entering onRefund");
       
        console.log("After calling onRefund:::"+ this.checkedLineItems.length)
        let refundorder = new RefundOrder();
        refundorder.orderId = this.order.orderId;
        refundorder.orderDate = new Date();
        refundorder.custId = 0;
        refundorder.refundlineItemlist = this.checkedLineItems;
        refundorder.orderAmt = this.getTotal();
        refundorder.orderStat = 'Devaki';
        this.refundService.submitRefund(refundorder).subscribe(
        successCode => {
         this.statusCode = successCode;
          console.log("this.statusCode:::"+this.statusCode);
       });
       
        
        this.lineitems.splice(0,this.checkedLineItems.length);
        this.checkedLineItems.splice(0,this.checkedLineItems.length);
        this.order.orderAmt = this.getTotal();
        this.onSave = true;
        console.log("checkedLineItems.length:::"+ this.onSave);
    }

ngOnInit(): void {
      
}
}



