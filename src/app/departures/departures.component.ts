import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DepartureDialogComponent} from "../departure-dialog/departure-dialog.component";
import {MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {TicketService } from '../services/ticket.service';
import {Ticket} from '../models/ticket';

export interface Departure{
  n_plate: string;
  driver_name: string;
  exit_time: number;
  destination: string;
  categorie: string;
  amount: number
}

// const DEPARTURE_DATA: Departure[] = [
//   { n_plate: 'BKT-167', driver_name: 'KENJI MOZOMBITE TAPIA', exit_time: 17.50,destination: 'CONSUELO', categorie: 'AUTOMOVIL', amount: 6.00},
//   { n_plate: 'BKT-167', driver_name: 'KENJI MOZOMBITE TAPIA', exit_time: 17.50,destination: 'CONSUELO', categorie: 'AUTOMOVIL', amount: 6.00},
//   { n_plate: 'BKT-167', driver_name: 'KENJI MOZOMBITE TAPIA', exit_time: 17.50,destination: 'CONSUELO', categorie: 'AUTOMOVIL', amount: 6.00},
//   { n_plate: 'BKT-167', driver_name: 'KENJI MOZOMBITE TAPIA', exit_time: 17.50,destination: 'CONSUELO', categorie: 'AUTOMOVIL', amount: 6.00},
//   { n_plate: 'BKT-167', driver_name: 'KENJI MOZOMBITE TAPIA', exit_time: 17.50,destination: 'CONSUELO', categorie: 'AUTOMOVIL', amount: 6.00},
//   { n_plate: 'BKT-167', driver_name: 'KENJI MOZOMBITE TAPIA', exit_time: 17.50,destination: 'CONSUELO', categorie: 'AUTOMOVIL', amount: 6.00},
// ];

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DeparturesComponent implements OnInit {
  displayedColumns: string[] = [ 'tic_placa', 'tic_hora', 'tic_destino', 'tic_categoria', 'tarifa_quantity', 'actions'];

  dataSource = [] as Ticket[];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private ticketService: TicketService) {
  }

  ngOnInit(): void {
    console.log('DeparturesComponent ngOnInit');
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

  getData(){
    this.ticketService.getAll().subscribe(
      (data) => {
        this.dataSource.push(data);
        //console.log(this.dataSource);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
