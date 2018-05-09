import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/products.service';
import { getLocaleDateTimeFormat, DatePipe } from '@angular/common';

@Component({
  selector: 'productslist',
  templateUrl: 'products.component.html',
  providers : [ProductService]
 
})
export class ProductsComponent {
  
  products : Product[] = [];
  //lineitems: LineItem[] = this.order.lineItemlist;
  lineitems: LineItem[] = [];
  lineItem: LineItem;
  currentDate: number = Date.now();
  statusCode: number;
  onSave:boolean = false;
  
  constructor(private productService : ProductService)
  {
      this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  displaySelectedProduct(selectedItem : Product)
  {
      this.lineItem = new LineItem();
      this.lineItem.shrtDesc = selectedItem.shrtDesc;
      this.lineItem.lineItemDesc = selectedItem.lngDesc;
      this.lineItem.lineItemPrc = selectedItem.price;
      this.lineItem.stock = selectedItem.stock;
      this.lineItem.lineItemDis = selectedItem.discount;
      this.lineItem.lineItemQuan = 0;
      //this.lineItem.lineItemUnTtlPrc = this.lineItem.lineItemQuan * this.lineItem.lineItemPrc - this.lineItem.lineItemDis
      this.lineitems.push(this.lineItem);
  }

  getTotal():number {
    
    let total:number = 0;
    this.lineitems.forEach(item => { 
      total = total + (item.lineItemQuan * item.lineItemPrc) - item.lineItemDis
    });
    return total;
  }

  getTotalUnitPrc()
  {

    //return lineitem.lineItemQuan * lineitem.lineItemPrc - lineitem.lineItemDis;
      console.log("Totalunit price:::"+this.lineitems.length)
      this.lineitems.forEach(item => { 
      item.lineItemUnTtlPrc =  (item.lineItemQuan * item.lineItemPrc) - item.lineItemDis;
      console.log("Item Prc" + item.lineItemPrc);
      console.log("Item Quantity" + item.lineItemQuan);
      console.log("Item Discount" + item.lineItemDis);
      console.log("Item Total Prc" + this.lineItem.lineItemUnTtlPrc);
    });
    
    console.log("in getTotalUnitPrc:::"+ this.lineitems.length)
    return this.lineitems;
  }

  removeLineItem(selectedLineItem : LineItem)
  {
    const index: number = this.lineitems.indexOf(selectedLineItem);
    if (index !== -1) {
      this.lineitems.splice(index, 1);
    }     
  }

  onSubmit()
  {
    console.log(" Entering onSubmit");
    this.lineitems = this.getTotalUnitPrc();
    console.log("After calling data:::"+ this.lineitems.length)
    let order = new Order();
    order.orderDate = new Date();
    order.custId = 0;
    order.lineItemlist =this.lineitems;
    order.orderAmt = this.getTotal();
    order.orderStat = 'Devaki';
    this.productService.crerateOrder(order).subscribe(
    successCode => {
     this.statusCode = successCode;
      console.log("this.statusCode:::"+this.statusCode);
   });
    this.lineitems.splice(0,this.lineitems.length);
    this.onSave = true;
    console.log("lineitems.length:::"+ this.onSave);
}
  
  ngOnInit() {
    //this.order = new Order(); 
}

}

class Product{
  shrtDesc: String;
  lngDesc : String;
  price:number;
  stock:number;
  discount:number;
}

export class LineItem extends Product{
  lineItemDesc:String;
  lineItemQuan:number = 0;
  lineItemPrc:number;
  lineItemDis:number;
  lineItemUnTtlPrc:number = 0;
  isChecked:boolean = false;
}

export class Order
{
  lineItemlist : LineItem[] = [];
	orderId:number;
  custId:number;
  orderAmt:number;
  orderStat:String;
	orderDate: Date;
}