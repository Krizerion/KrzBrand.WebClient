import { GlobalDataService } from './../../services/global-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'krz-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  totalProducts: number = 0;

  constructor(private router: Router, private globalDataService: GlobalDataService) {}

  ngOnInit(): void {
    this.totalProducts = this.globalDataService.allProducts.length;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
