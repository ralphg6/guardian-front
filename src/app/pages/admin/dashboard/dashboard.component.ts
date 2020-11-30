import { Component, OnInit } from '@angular/core';
import { TableData } from '../../../components/table/table.component';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private atrasadas: number;
  private concluidas: number;
  private pendentes: number;

  private tableData: TableData;

  private atividadesPendentes: any[];

  private atividadesEntregues: any[];

  ngOnInit() {
    this.atrasadas = 2;
    this.concluidas = 40;
    this.pendentes = 10;

    this.tableData = {
      headerRow: ['Nome', 'Turma', 'Data', 'Salary'],
      dataRows: [
        ['Dakota Rice', 'Niger', '20-10-2020', '$36,738'],
        ['Minerva Hooper', 'Curaçao', '20-10-2020', '$23,789'],
        ['Sage Rodriguez', 'Netherlands', '20-10-2020', '$56,142'],
        ['Philip Chaney', 'Korea, South', '20-10-2020', '$38,735'],
        ['Doris Greene', 'Malawi', '20-10-2020', '$63,542'],
        ['Mason Porter', 'Chile', '20-10-2020', '$78,615']
      ]
    };

    this.atividadesPendentes = [
      ['24-11-2020', 7],
      ['25-11-2020', 4],
      ['26-11-2020', 3],
      ['27-11-2020', 3],
      ['28-11-2020', 2],
    ]

    this.atividadesEntregues = [
      ['24-11-2020', 1],
      ['25-11-2020', 2],
      ['26-11-2020', 1],
      ['28-11-2020', 2],
    ]
  }
}
