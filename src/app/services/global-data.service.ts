import { ProductService } from './product-data.service';
import { Injectable } from '@angular/core';
import { Product } from './../classes/product';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class GlobalDataService {
  allProducts: Product[] = [];
  allCountries: string[] = [];
  allBrands: string[] = [];
  allTypes: string[] = [];
  constructor(private http: Http, private productService: ProductService) {}

  init() {
    return this.productService.getProducts().then(response => {
        localStorage.clear();
        this.allProducts = response;
        response.forEach((product) => {
          if (this.allCountries.indexOf(product.country) === -1) {
            this.allCountries.push(product.country);
          }
          if (this.allBrands.indexOf(product.brand) === -1) {
            this.allBrands.push(product.brand);
          }
          if (this.allTypes.indexOf(product.type) === -1) {
            this.allTypes.push(product.type);
          }
        });
    });
  }
}
