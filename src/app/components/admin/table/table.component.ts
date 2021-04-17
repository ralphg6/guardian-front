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

  public dataSource: any[] = [];
  public columns: string[] = [];
  public properties: string[] = [];

  ngOnInit(): void {
    console.log('TABLE DATA: ', this.data);
    this.hasActions = this.excluir !== undefined || this.editar !== undefined;
    this.initTable();
  }

  private initTable() {
    this.dataSource = this.data.rows;
    this.columns = this.data.cols;
    this.properties = this.data.headers;
  }
}
