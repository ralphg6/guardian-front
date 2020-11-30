import { Component, Input, OnInit } from '@angular/core';

export declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-table',
  moduleId: module.id,
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  public data: TableData;
  ngOnInit() {}
}
