import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import * as randomColor from 'randomcolor'; // import the script

export declare type ChatBarsData = any[];

@Component({
  selector: 'app-chart-bars',
  moduleId: module.id,
  templateUrl: 'bars.component.html'
})
export class ChartBarsComponent implements AfterViewInit {

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  data: ChatBarsData;

  @Input()
  emptyMessage = 'Sem dados para exibir';

  @ViewChild('chart', { static: false })
  canvas: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {

    console.log('this.data', this.data);
    console.log('this.canvas', this.canvas);

    if (!this.data || this.data.length === 0) { return; }

    if (!this.canvas) { return; }

    const dataFirst = {
      data: this.data.map(row => row[1]),
      backgroundColor: this.data.map(row => randomColor({
        luminosity: 'light',
        format: 'rgba',
        alpha: 0.6 // e.g. 'rgba(9, 1, 107, 0.5)',
      })),
    };

    const chartdata = {
      labels: this.data.map(row => row[0]),
      datasets: [dataFirst]
    };

    const chartOptions = {
      legend: {
        display: false,
        position: 'top'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    const chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      hover: false,
      data: chartdata,
      options: chartOptions
    });

  }

}
