import { Component, Input, OnInit } from '@angular/core';

export declare interface TableData {
  headers: string[];
  rows: any[];
  cols: string[];
  id: string;
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
  @Input()
  public excluir: Function;
  @Input()
  public editar: Function;
  public hasActions = false;
  ngOnInit(): void {
    this.hasActions = this.excluir !== undefined || this.editar !== undefined;
  }
}
