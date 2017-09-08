import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Product } from './../classes/product';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  getProducts(): Promise<Product[]> {
    return this.http.get('./data.1.json')
               .toPromise()
               .then((response) => {
                 return response.json() as Product[];
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
