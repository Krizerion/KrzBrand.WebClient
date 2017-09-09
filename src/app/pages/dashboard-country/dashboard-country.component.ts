import { Card } from './../../classes/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../classes/product';
import { GlobalDataService } from './../../services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from "../../constants/constants";

@Component({
  selector: 'krz-brand-dashboard-country',
  templateUrl: './dashboard-country.component.html'
})
export class DashboardCountryComponent implements OnInit {
  private routeSubscribe: any;
  selectedChart: string;
  chartTypes: any[] = CONSTANTS.CHART_TYPES;
  country: string;
  pageTitle: string;
  productsForCountry: Product[];
  brands: Card[] = [];
  detailsShown: any;
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
       this.country = params['country'];
    });
    this.productsForCountry = this.globalDataService.allProducts
      .filter(product => product.country === this.country);
    this.pageTitle = this.productsForCountry.length + " PRODUCTS FOUND FOR " + this.country.toUpperCase();
    this.getBrandsGroups();
    this.prepareChartData();
    this.selectedChart = localStorage.getItem('dashboard-country-chart') || this.chartTypes[0].value;
    this.detailsShown = localStorage.getItem('dashboard-country-details-shown') || false;
    localStorage.setItem('dashboard-country-chart', this.selectedChart);
  }

  getBrandsGroups(): void {
    this.productsForCountry.forEach(product => {
      let isAlreadyActiveBrand = false;
      for (let i = 0; i < this.brands.length; i++) {
        if (this.brands[i].name === product.brand) {
          isAlreadyActiveBrand = true;
          this.brands[i].count++;
          break;
        }
      }
      if (!isAlreadyActiveBrand) {
        this.brands.push({
          name: product.brand,
          count: 1,
          type: 'brand'
        });
      }
    });

    this.brands = this.brands.sort((n1, n2) => n2.count - n1.count);

    this.brands.forEach(brands => {
      brands.percentage = ((brands.count / this.productsForCountry.length) * 100).toFixed(2);
    });
  }

  prepareChartData(): void {
    this.brands.forEach((brand: Card) => {
      this.details.single.push({
        "name": brand.name,
        "value": brand.count
      })
    });
  }

  openFromCard(event: any, brand: Card): void {
    if (brand.type === 'brand') {
      this.router.navigateByUrl('/dashboard/' + this.country + '/' + brand.name.split(' ').join(''));
    }
  };

  dashboardSummary(): void {
    this.detailsShown = !this.detailsShown;
    if(this.detailsShown == true) {
      localStorage.setItem('dashboard-country-details-shown', 'true')
    } else {
      localStorage.setItem('dashboard-country-details-shown', 'false')
    }
  }

  openFromChart(event: any) {
    this.router.navigateByUrl('/dashboard/' + this.country + '/' + event.name.split(' ').join(''));
  }

  changeChartType(value: string): void {
    let target: any = this.chartTypes.filter(chart => chart.value === value);
    this.selectedChart = value;
    localStorage.setItem('dashboard-country-chart', value);
  };
}
