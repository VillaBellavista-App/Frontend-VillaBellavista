import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DepartureDialogComponent} from "../departure-dialog/departure-dialog.component";
import {MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {TicketService } from '../services/ticket.service';
import {Ticket} from '../models/ticket';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DeparturesComponent implements OnInit {
  displayedColumns: string[] = [ 'tic_placa','tic_hora', 'tic_destino', 'tic_categoria', 'tarifa_quantity', 'actions'];
  dataSource = [] as Ticket[];
  tabContentsVisibility: boolean[] = [true, false];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private ticketService: TicketService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.getData();
    console.log(this.dataSource);
  }

  openDepartureDialog(departure?: Ticket): void {
    const dialogRef = this.dialog.open(DepartureDialogComponent, {
      data: departure // Si departure está presente, estamos en modo de edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (departure) {
          // Modo edición - actualizamos los datos del departure en el dataSource
          const index = this.dataSource.findIndex(d => d === departure);
          if (index !== -1) {
            this.dataSource[index] = result;
            this.dataSource = [...this.dataSource];
          }
        } else {
          // Modo añadir - agregamos el nuevo Departure al dataSource
          this.dataSource.push(result);
          this.dataSource = [...this.dataSource];
        }
      }
    });
  }

  deleteDeparture(departure: Ticket): void {
    // Encontrar el índice del departure en el dataSource
    const index = this.dataSource.findIndex(d => d === departure);

    // Si se encuentra el departure, eliminarlo del dataSource
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  toggleTab(tabIndex: number, e: MouseEvent): void {
    this.activeTab = tabIndex;

    const line = this.line.nativeElement as HTMLElement;

    if (e.target instanceof HTMLElement) {
      line.style.width = e.target.offsetWidth - 27 + 'px';
      line.style.left = e.target.offsetLeft +12 +'px';
    }
    // Cambiar la visibilidad del contenido
    this.tabContentsVisibility = this.tabContentsVisibility.map((_, index) => index === tabIndex);
  }
  getData(){
    this.ticketService.getAll().subscribe(
      (data: Ticket[]) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
