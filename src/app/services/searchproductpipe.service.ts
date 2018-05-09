import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchproduct'
})

@Injectable()
export class SearchProductPipe implements PipeTransform {
 transform(products: any[], field: string, value: string): any[] {
   if (!products) return [];
   if (!value) return [];
      return products.filter(it => it[field].toLowerCase().includes(value.toLowerCase()));
 }
}