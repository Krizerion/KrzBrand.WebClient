import { Card } from './../../classes/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../classes/product';
import { GlobalDataService } from './../../services/global-data.service';
import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from "../../constants/constants";

@Component({
  selector: 'krz-brand-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  detailsShown: any;
  private routeSubscribe: any;
  selectedCountry: string;
  selectedBrand: string;
  selectedType: string;
  selectedChart: string;
  chartTypes: any[] = CONSTANTS.CHART_TYPES;
  pageTitle: string;
  tableData: Product[];
  brands: Card[] = [];
  colTitles: string[] = ["Product Id", "Name", "Date", "Price", "Gender", "Color"];
  allCountries: string[] = [];
  allBrands: string[] = [];
  allTypes: string[] = [];
  details: any = {
    single: []
  };

  constructor(
    private route: ActivatedRoute,
    private globalDataService: GlobalDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allCountries = this.globalDataService.allCountries;
    this.allBrands = this.globalDataService.allBrands;
    this.allTypes = this.globalDataService.allTypes;
    this.routeSubscribe = this.route.params.subscribe(params => {
       this.selectedCountry = params['country'];
       this.selectedBrand = params['brand'];
       this.selectedType = params['type'];
    });
    this.getProductsBySelectedFilters(this.selectedCountry, this.selectedBrand, this.selectedType);
    this.updateTitle();
    this.prepareChartData();
    this.selectedChart = localStorage.getItem('details-chart') || this.chartTypes[0].value;
    this.detailsShown = localStorage.getItem('details-shown') || false;
    localStorage.setItem('details-chart', this.selectedChart);
  }

  prepareChartData() {
    this.details.single = [];
    this.tableData.forEach(item => {
      let itemExists: boolean = false;
      for (let i = 0; i < this.details.single.length; i++) {
        if (item.date.split('-')[0] === this.details.single[i].name) {
          this.details.single[i].value += parseFloat(item.price);
          itemExists = true;
          break;
        }
      }
      if (!itemExists) {
        this.details.single.push({
          "name": item.date.split('-')[0],
          "value": parseFloat(item.price)
        });
      }
    });

    this.sortChartDataByYear();
  }

  sortChartDataByYear() {
    this.details.single = this.details.single.sort((n1: any, n2: any) => parseInt(n2.name) - parseInt(n1.name));
  }

  updateTitle(): void {
    if (this.tableData.length > 0) {
      this.pageTitle =
          this.tableData.length + ' ' +
          this.selectedType.toUpperCase() +
          " PRODUCTS FOUND FOR " +
          this.selectedBrand.toUpperCase() +
          " IN " +
          this.selectedCountry.toUpperCase();
    } else {
      this.pageTitle = "NO DATA AVAILABLE FOR THE CURRENT FILTERS"
    }
  }

  getProductsBySelectedFilters(country: string, brand: string, type: string): void {
    this.tableData = this.globalDataService.allProducts.filter(
        product => product.brand === brand &&
        product.country === country &&
        product.type === type
    );
  }

  changeCountry(country: string) {
    this.selectedCountry = country;
    this.updateRouteParams();
    this.getProductsBySelectedFilters(this.selectedCountry, this.selectedBrand, this.selectedType);
    this.prepareChartData();
    this.updateTitle();
  }

  changeBrand(brand: string) {
    this.selectedBrand = brand;
    this.updateRouteParams();
    this.getProductsBySelectedFilters(this.selectedCountry, this.selectedBrand, this.selectedType);
    this.prepareChartData();
    this.updateTitle();
  }

  changeType(type: string) {
    this.selectedType = type;
    this.updateRouteParams();
    this.getProductsBySelectedFilters(this.selectedCountry, this.selectedBrand, type);
    this.prepareChartData();
    this.updateTitle();
  }

  updateRouteParams(): void {
    this.router.navigate(['/dashboard/' + this.selectedCountry + '/' + this.selectedBrand + '/' + this.selectedType]);
  }

  summary(): void {
    this.detailsShown = !this.detailsShown;
    if(this.detailsShown == true) {
      localStorage.setItem('details-shown', 'true')
    } else {
      localStorage.setItem('details-shown', 'false')
    }
  }

  changeChartType(value: string): void {
    let target: any = this.chartTypes.filter(chart => chart.value === value);
    this.selectedChart = value;
    localStorage.setItem('details-chart', value);
  };
}
