import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchorder'
})

@Injectable()
export class SearchOrderPipe implements PipeTransform {
 transform(orders: any[], field: number, value: number): any[] {
console.log("field::"+field);
console.log("field::"+value);

   if (!orders) return [];
   if (!value) return [];
      return orders.filter(it => it[field].includes(value));
 }
}