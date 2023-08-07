import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Ticket } from '../models/ticket';
import { MatDialog } from "@angular/material/dialog";
import { TicketService } from "../services/ticket.service";
import { DepartureDialogComponent } from "../departure-dialog/departure-dialog.component";

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.css'],
})

export class DeparturesComponent implements OnInit {
  displayedColumns: string[] = ['tic_placa', 'tic_hora', 'tic_destino', 'tic_categoria', 'tarifa_quantity', 'actions'];
  dataSource = new MatTableDataSource<Ticket>(); // Create an instance of MatTableDataSource
  tabContentsVisibility: boolean[] = [true, false];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private ticketService: TicketService) {
  }

  ngOnInit(): void {
    // Initialize paginator and sort properties of MatTableDataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Set custom itemsPerPageLabel for paginator
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';

    this.getData();
  }

  openDepartureDialog(departure?: Ticket): void {
    const dialogRef = this.dialog.open(DepartureDialogComponent, {
      data: departure // Si departure está presente, estamos en modo de edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (departure) {
          // Modo edición - actualizamos los datos del departure en el dataSource
          const index = this.dataSource.data.findIndex(d => d === departure); // Use this.dataSource.data
          if (index !== -1) {
            this.dataSource.data[index] = result; // Update data in MatTableDataSource
            this.dataSource.data = [...this.dataSource.data]; // Update the reference to trigger change detection
          }
        } else {
          // Modo añadir - agregamos el nuevo departure al dataSource
          this.dataSource.data.push(result); // Update data in MatTableDataSource
          this.dataSource.data = [...this.dataSource.data]; // Update the reference to trigger change detection
        }
      }
    });
  }
  deleteDeparture(departure: Ticket): void {
    const index = this.dataSource.data.findIndex(d => d === departure);

    if (index !== -1) {
      this.dataSource.data.splice(index, 1); // Update data in MatTableDataSource
      this.dataSource.data = [...this.dataSource.data]; // Update the reference to trigger change detection
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
        this.dataSource.data = data; // Set data to the MatTableDataSource
        this.dataSource.paginator = this.paginator; // Set paginator property of MatTableDataSource
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
