import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-stats',
  moduleId: module.id,
  templateUrl: 'card-stats.component.html',
  styleUrls: ['./card-stats.component.css']
})
export class CardStatsComponent implements OnInit {

  public isLoading = false;

  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  value: string;

  constructor() {}

  ngOnInit() {}

}
