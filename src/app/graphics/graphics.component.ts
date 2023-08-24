import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent {
  tabContentsVisibility: boolean[] = [true, false];
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;


  public chartType: ChartType = 'doughnut';
  public chartData: ChartData = {
    labels: ['One', 'Two', 'Three'],
    datasets: [{
      data: [30, 50, 20],
      backgroundColor: ['red', 'blue', 'green'], // Colores para las secciones del donut
    }]
  };
  public chartType2: ChartType = 'line';
  public chartData2: ChartData = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    datasets: [
      {
        label: 'Ventas',
        data: [10, 20, 15, 25, 30,40,30],
        borderColor: '#228CE8',
        backgroundColor: '#228CE8',
        pointBorderColor: '#228CE8',
        pointRadius: 5,
        pointBackgroundColor: 'white',
        fill: false
      }
    ]
  };
  toggleTab(tabIndex: number, e: MouseEvent): void {
    const line = this.line.nativeElement as HTMLElement;

    if (e.target instanceof HTMLElement) {
      line.style.width = e.target.offsetWidth - 27 + 'px';
      line.style.left = e.target.offsetLeft + 12 + 'px';
    }

    this.activeTab = tabIndex;
    this.tabContentsVisibility = this.tabContentsVisibility.map((_, index) => index === tabIndex);

  }
}
