import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChartData, ChartType } from 'chart.js';
import {DestinationService} from '../services/destination.service';
import {TicketService} from '../services/ticket.service';
import {Ticket} from '../models/ticket';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})

export class GraphicsComponent {
  tabContentsVisibility: boolean[] = [true, false];
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private destinationService: DestinationService, private tickerService: TicketService) {
    this.getDestination();
    this.countTickets();
  }
  
  public chartType: ChartType = 'doughnut';

  public chartData: ChartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'grey'], // Colores para las secciones del donut
    }]
  };

  public chartType2: ChartType = 'line';

  public chartData2: ChartData = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [
      {
        label: 'Ventas',
        data: [30, 20, 15, 25, 30, 40, 30],
        borderColor: '#228CE8',
        backgroundColor: '#228CE8',
        pointBorderColor: '#228CE8',
        pointRadius: 6,
        pointBackgroundColor: 'white',
        fill: false
      }
    ]
  };

  public chartOptions2: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#BABABA',// Cambiar el color de fuente del eje X
          font: {
            size: 18,// Cambiar el tamaño de fuente del eje X
            weight: 600,
          }
        }
      },
      y: {
        ticks: {
          color: '#BABABA',
          font: {
            size: 18,// Cambiar el tamaño de fuente del eje X
            weight: 600,
          }
        }
      }
    }
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

  getDestination(){
    this.destinationService.getAll().subscribe((destinations) => {
      console.log(destinations);
      this.chartData.labels = destinations.map((d) => d.des_nombre);
    });
  }

  countTickets() {
    this.tickerService.getAll().subscribe((tickets: Ticket[]) => {
      const destinationCounts: { [key: string]: number } = {};

      for (const ticket of tickets) {
        const destination = ticket.tic_destino;
        if (destinationCounts[destination]) {
          destinationCounts[destination]++;
        } else {
          destinationCounts[destination] = 1;
        }
      }

      const resultArray = [];
      for (const destination in destinationCounts) {
        resultArray.push({ destination: destination, count: destinationCounts[destination] });
      }

       // Actualizar los datos del gráfico
      this.chartData.labels = resultArray.map(item => item.destination);
      this.chartData.datasets[0].data = resultArray.map(item => item.count);

      console.log(resultArray); // Aquí puedes hacer lo que necesites con los resultados
    });
  }
}
