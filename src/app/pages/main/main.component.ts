import { GlobalDataService } from './../../services/global-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'krz-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  totalProducts: number = 0;
  totalCountries: number = 0;
  totalBrands: number = 0;
  totalTypes: number = 0;

  constructor(private router: Router, private globalDataService: GlobalDataService) {}

  ngOnInit(): void {
    this.totalProducts = this.globalDataService.allProducts.length;
    this.totalCountries = this.globalDataService.allCountries.length;
    this.totalBrands = this.globalDataService.allBrands.length;
    this.totalTypes = this.globalDataService.allTypes.length;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
