import { CONSTANTS } from './../../constants/constants';
import { GlobalDataService } from './../../services/global-data.service';
import { Card } from './../../classes/card';
import { ProductService } from './../../services/product-data.service';
import { Product } from './../../classes/product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'krz-brand-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  selectedChart: string;
  pageTitle: string;
  allProducts: Product[];
  countries: Card[] = [];
  detailsShown: any;
  chartTypes: any[] = CONSTANTS.CHART_TYPES;
  details: any = {
    single: []
  }

  constructor(
    private productDataService: ProductService,
    private globalDataService: GlobalDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allProducts = [];
    this.allProducts = this.globalDataService.allProducts;
    this.getCountriesGroups();
    this.prepareChartData();
    this.pageTitle = this.allProducts.length + ' PRODUCTS FOUND FOR ALL COUNTRIES';
    this.selectedChart = localStorage.getItem('dashboard-chart') || this.chartTypes[0].value;
    this.detailsShown = localStorage.getItem('dashboard-details-shown') || false;
    localStorage.setItem('dashboard-chart', this.selectedChart);
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
    if(this.detailsShown == true) {
      localStorage.setItem('dashboard-details-shown', 'true')
    } else {
      localStorage.setItem('dashboard-details-shown', 'false')
    }
  }

  changeChartType(value: string): void {
    let target: any = this.chartTypes.filter(chart => chart.value === value);
    this.selectedChart = value;
    localStorage.setItem('dashboard-chart', value);
  };
}
