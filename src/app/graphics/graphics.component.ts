import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { DestinationService } from '../services/destination.service';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';
import { TicketCountItem } from '../models/ticketCount';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css'],
})
export class GraphicsComponent implements OnInit {
  dataLoaded: boolean = false;
  tabContentsVisibility: boolean[] = [true, false];
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;
  totalEarnings: number | undefined;
  ticketCounts: TicketCountItem[] = [];

  constructor(
    private destinationService: DestinationService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.getDestination();
    this.countTickets();
    this.countTicketPerMonth();
  }

  public chartType: ChartType = 'doughnut';

  public chartData: ChartData = {
    labels: [
      'Saposoa',
      'Consuelo',
      'Nuevo Lima',
      'Bellavista',
      'Barranco',
      'Juanjui',
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'red',
          'blue',
          'green',
          'orange',
          'purple',
          'grey',
        ], // Colores para las secciones del donut
      },
    ],
  };

  public chartType2: ChartType = 'line';

  public chartData2: ChartData = {
    labels: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    datasets: [
      {
        label: 'Ventas',
        data: [],
        borderColor: '#228CE8',
        backgroundColor: '#228CE8',
        pointBorderColor: '#228CE8',
        pointRadius: 6,
        pointBackgroundColor: 'white',
        fill: false,
      },
    ],
  };

  public chartOptions2: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#BABABA', // Cambiar el color de fuente del eje X
          font: {
            size: 18, // Cambiar el tamaño de fuente del eje X
            weight: 600,
          },
        },
      },
      y: {
        ticks: {
          color: '#BABABA',
          font: {
            size: 18, // Cambiar el tamaño de fuente del eje X
            weight: 600,
          },
        },
      },
    },
  };

  countTickets() {
    this.ticketService.getAll().subscribe((tickets: Ticket[]) => {
      const ticketCountsByDestino: { [key: string]: number } = {};

      // Contar los tickets por destino
      tickets.forEach((ticket) => {
        if (ticketCountsByDestino[ticket.tic_destino]) {
          ticketCountsByDestino[ticket.tic_destino]++;
        } else {
          ticketCountsByDestino[ticket.tic_destino] = 1;
        }
      });

      // Filtrar los destinos con conteo mayor que cero
      const destinosConTickets = Object.keys(ticketCountsByDestino).filter(
        (destino) => ticketCountsByDestino[destino] > 0
      );

      // Actualizar el chartData
      this.chartData.labels = destinosConTickets;
      this.chartData.datasets[0].data = destinosConTickets.map(
        (destino) => ticketCountsByDestino[destino]
      );
      this.chartData.datasets[0].backgroundColor = [
        'red',
        'blue',
        'green',
        'orange',
        'purple',
        'grey',
      ];
    });
  }

  toggleTab(tabIndex: number, e: MouseEvent): void {
    const line = this.line.nativeElement as HTMLElement;

    if (e.target instanceof HTMLElement) {
      line.style.width = e.target.offsetWidth - 27 + 'px';
      line.style.left = e.target.offsetLeft + 12 + 'px';
    }

    this.activeTab = tabIndex;
    this.tabContentsVisibility = this.tabContentsVisibility.map(
      (_, index) => index === tabIndex
    );
  }

  getDestination() {
    return this.destinationService.getAll();
  }

  updateChartData() {
    const newData: number[] = [];
    if (this.chartData2.datasets && this.chartData2.datasets.length > 0) {
      for (const ticketCount of this.ticketCounts) {
        // Acceder a la propiedad 'ticket_count' de manera segura
        const ticketCountValue = ticketCount.ticket_count;
        newData.push(ticketCountValue);
      }
      this.chartData2.datasets[0].data = newData;
    }
  }

  countTicketPerMonth() {
    this.ticketService.countTicketPerMonth().subscribe((data) => {
      this.ticketCounts = data;
      console.log(this.ticketCounts);
      this.totalEarnings = this.calculateTotalEarnings(data);
      this.dataLoaded = true;
      this.updateChartData();
    });
  }

  calculateTotalEarnings(ticketCounts: TicketCountItem[]): number {
    return ticketCounts.reduce(
      (total, item) => total + item.total_earnings,
      0
    );
  }
}
