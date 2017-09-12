import { RandomGeneratorComponent } from './pages/random-generator/random-generator.component';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';
import { DashboardBrandComponent } from './pages/dashboard-brand/dashboard-brand.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCountryComponent } from './pages/dashboard-country/dashboard-country.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'dashboard/:country',  component: DashboardCountryComponent },
  { path: 'dashboard/:country/:brand',  component: DashboardBrandComponent },
  { path: 'dashboard/:country/:brand/:type',  component: DetailsComponent },
  { path: 'random-generator',  component: RandomGeneratorComponent },
  { path: '**', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
