import { Card } from './../../classes/card';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'krz-brand-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {
  @Input() data: Card;
  constructor() { }
  ngOnInit() { }
}
