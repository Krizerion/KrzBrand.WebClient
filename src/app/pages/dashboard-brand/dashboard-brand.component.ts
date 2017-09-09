import { Card } from './../../classes/card';
import { GlobalDataService } from './../../services/global-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../classes/product';
import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from "../../constants/constants";

@Component({
  selector: 'krz-brand-dashboard-brand',
  templateUrl: './dashboard-brand.component.html'
})
export class DashboardBrandComponent implements OnInit {
  private routeSubscribe: any;
  selectedChart: string;
  chartTypes: any[] = CONSTANTS.CHART_TYPES;
  brand: string;
  country: string;
  pageTitle: string;
  productsForBrand: Product[];
  types: Card[] = [];
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
       this.brand = params['brand'];
       this.country = params['country'];
    });
    this.productsForBrand = this.globalDataService.allProducts
        .filter(product => product.brand === this.brand && product.country === this.country);
    this.pageTitle = this.productsForBrand.length + " PRODUCTS FOUND FOR " + this.brand.toUpperCase() + " IN " + this.country.toUpperCase();
    this.getBrandsGroups();
    this.prepareChartData();
    this.selectedChart = localStorage.getItem('dashboard-brand-chart') || this.chartTypes[0].value;
    this.detailsShown = localStorage.getItem('dashboard-brand-details-shown') || false;
    localStorage.setItem('dashboard-brand-chart', this.selectedChart);
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
    if(this.detailsShown == true) {
      localStorage.setItem('dashboard-brand-details-shown', 'true')
    } else {
      localStorage.setItem('dashboard-brand-details-shown', 'false')
    }
  }

  openFromChart(event: any) {
    this.router.navigateByUrl(
      '/dashboard/' +
      this.country + '/' +
      this.brand + '/' +
      event.name.split(' ').join(''));
  }

  changeChartType(value: string): void {
    let target: any = this.chartTypes.filter(chart => chart.value === value);
    this.selectedChart = value;
    localStorage.setItem('dashboard-brand-chart', value);
  };
}
