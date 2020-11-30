import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-stats',
  moduleId: module.id,
  templateUrl: 'card-stats.component.html'
})
export class CardStatsComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  value: string;

  constructor() {}

  ngOnInit() {}

}
