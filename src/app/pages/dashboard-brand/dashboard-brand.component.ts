import { Card } from './../../classes/card';
import { GlobalDataService } from './../../services/global-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../classes/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'krz-brand-dashboard-brand',
  templateUrl: './dashboard-brand.component.html'
})
export class DashboardBrandComponent implements OnInit {
  private routeSubscribe: any;
  brand: string;
  country: string;
  pageTitle: string;
  productsForBrand: Product[];
  types: Card[] = [];
  detailsShown: boolean = false;
  details: any = {
    single: []
  }

  constructor(
    private route: ActivatedRoute,
    private globalDataService: GlobalDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscribe = this.route.params.subscribe(params => {
       this.brand = params['brand'];
       this.country = params['country'];
    });
    this.productsForBrand = this.globalDataService.allProducts
        .filter(product => product.brand === this.brand && product.country === this.country);
    this.pageTitle = this.productsForBrand.length + " PRODUCTS FOUND FOR " + this.brand.toUpperCase() + " IN " + this.country.toUpperCase();
    this.getBrandsGroups();
    this.prepareChartData();
  }

  getBrandsGroups(): void {
    this.productsForBrand.forEach(product => {
      let isAlreadyActiveType = false;
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].name === product.type) {
          isAlreadyActiveType = true;
          this.types[i].count++;
          break;
        }
      }
      if (!isAlreadyActiveType) {
        this.types.push({
          name: product.type,
          count: 1,
          type: 'type'
        });
      }
    });

    this.types = this.types.sort((n1, n2) => n2.count - n1.count);

    this.types.forEach(type => {
        type.percentage = ((type.count / this.productsForBrand.length) * 100).toFixed(2);
    });
  }

  prepareChartData(): void {
    this.types.forEach((type: Card) => {
      this.details.single.push({
        "name": type.name,
        "value": type.count
      })
    });
  }

  openFromCard(event: any, type: Card): void {
    if (type.type === 'type') {
      this.router.navigateByUrl(
        '/dashboard/' +
        this.country + '/' +
        this.brand + '/' +
        type.name.split(' ').join(''));
    }
  };

  dashboardSummary(): void {
    this.detailsShown = !this.detailsShown;
  }

  openFromChart(event: any) {
    this.router.navigateByUrl(
      '/dashboard/' +
      this.country + '/' +
      this.brand + '/' +
      event.name.split(' ').join(''));
  }
}
