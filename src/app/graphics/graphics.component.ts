import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { DestinationService } from '../services/destination.service';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';
import { TicketCountItem } from '../models/ticketCount';
import { forkJoin, tap } from 'rxjs';
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
    forkJoin([this.getDestination(), this.countTickets()]).subscribe(
      ([destinations, ticketData]) => {
        // Procesar los datos después de que ambas llamadas hayan completado
        this.chartData.labels = destinations.map((d) => d.des_nombre);
        // Aquí puedes procesar los datos de los tickets si es necesario
        this.countTicketPerMonth();
      }
    );
  }

  public chartType: ChartType = 'doughnut';

  public chartOptions: any = {
    responsive: true,
    legend: {
      display: true,
    },
  };
  public chartData: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgb(36, 79, 243)', //AZUL
          'rgb(104, 226, 48)', //VERDE
          'rgb(234, 125, 66)', //NARANJA
          'rgb(234, 52, 26)', //ROJO
          'rgb(43, 165, 248)', //CELESTE
          'rgb(255, 190, 0)', //AMARILLO
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
    return this.destinationService.getAll().pipe(
      tap((destinations) => {
        console.log(destinations); // Agrega esta línea para verificar los datos
      })
    );
  }

  countTickets() {
    return this.ticketService.getAll().pipe(
      map((tickets: Ticket[]) => {
        const destinationCounts: { [key: string]: number } = {};
        console.log('countTickets');
        console.log(tickets);

        // Crear un array de objetos con todos los labels (destinos) posibles
        const allLabels = ['Saposoa', 'Nuevo Lima', 'Bellavista', 'Barranca', 'Consuelo', 'Juanjui'];

        for (const ticket of tickets) {
          const destination = ticket.tic_destino;
          if (destinationCounts[destination]) {
            destinationCounts[destination]++;
          } else {
            destinationCounts[destination] = 1;
          }
        }

        const resultArray = [];
        for (const label of allLabels) {
          const count = destinationCounts[label] || 0; // Asignar 0 si no hay datos
          resultArray.push({
            destination: label,
            count: count,
          });
        }

        // Actualizar los datos del gráfico
        this.chartData.labels = resultArray.map((item) => item.destination);
        this.chartData.datasets[0].data = resultArray.map((item) => item.count);
        console.log(this.chartData.datasets[0].data);
        return resultArray;
      })
    );
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
