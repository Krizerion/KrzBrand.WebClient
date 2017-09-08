import { GlobalDataService } from './../../services/global-data.service';
import { Card } from './../../classes/card';
import { ProductService } from './../../services/product-data.service';
import { Product } from './../../classes/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'krz-brand-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  pageTitle: string;
  allProducts: Product[];
  countries: Card[] = [];
  detailsShown: boolean = false;
  details: any = {
    single: []
  }

  constructor(
    private productDataService: ProductService,
    private globalDataService: GlobalDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allProducts = [];
    this.allProducts = this.globalDataService.allProducts;
    this.getCountriesGroups();
    this.prepareChartData();
    this.pageTitle = this.allProducts.length + ' PRODUCTS FOUND FOR ALL COUNTRIES';
  }

  getCountriesGroups(): void {
    this.allProducts.forEach(product => {
      let isAlreadyActiveCountry = false;
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].name === product.country) {
          isAlreadyActiveCountry = true;
          this.countries[i].count++;
          break;
        }
      }
      if (!isAlreadyActiveCountry) {
        this.countries.push({
          name: product.country,
          count: 1,
          type: 'country'
        });
      }
    });

    this.countries = this.countries.sort((n1, n2) => n2.count - n1.count);

    this.countries.forEach(country => {
      country.percentage = ((country.count / this.allProducts.length) * 100).toFixed(2);
    });
  }

  prepareChartData(): void {
    this.countries.forEach((country: Card) => {
      this.details.single.push({
        "name": country.name,
        "value": country.count
      })
    });
  }

  openFromCard(event: any, country: Card): void {
    if (country.type === 'country') {
      this.router.navigateByUrl('/dashboard/' + country.name.split(' ').join(''));
    }
  };

  openFromChart(event: any) {
    this.router.navigateByUrl('/dashboard/' + event.name.split(' ').join(''));
  }

  dashboardSummary(): void {
    this.detailsShown = !this.detailsShown;
  }
}
