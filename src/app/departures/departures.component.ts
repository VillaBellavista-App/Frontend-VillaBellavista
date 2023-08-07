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
  allDeparturesDataSource: MatTableDataSource<Ticket> = new MatTableDataSource<Ticket>();
  todayDeparturesDataSource: MatTableDataSource<Ticket> = new MatTableDataSource<Ticket>();
  tabContentsVisibility: boolean[] = [true, false];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private dialog: MatDialog, private ticketService: TicketService) {}

  ngOnInit(): void {
    this.getData();
  }

  openDepartureDialog(departure?: Ticket): void {
    const dialogRef = this.dialog.open(DepartureDialogComponent, {
      data: departure,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (departure) {
          const index = this.allDeparturesDataSource.data.findIndex((d) => d === departure);
          if (index !== -1) {
            this.allDeparturesDataSource.data[index] = result;
            this.allDeparturesDataSource.data = [...this.allDeparturesDataSource.data];
          }
        } else {
          this.allDeparturesDataSource.data.push(result);
          this.allDeparturesDataSource.data = [...this.allDeparturesDataSource.data];
        }
      }
    });
  }

  deleteDeparture(departure: Ticket): void {
    const index = this.allDeparturesDataSource.data.findIndex((d) => d === departure);

    if (index !== -1) {
      this.allDeparturesDataSource.data.splice(index, 1);
      this.allDeparturesDataSource.data = [...this.allDeparturesDataSource.data];
    }
  }

  toggleTab(tabIndex: number, e: MouseEvent): void {
    const line = this.line.nativeElement as HTMLElement;

    if (e.target instanceof HTMLElement) {
      line.style.width = e.target.offsetWidth - 27 + 'px';
      line.style.left = e.target.offsetLeft + 12 + 'px';
    }

    this.activeTab = tabIndex;
    this.tabContentsVisibility = this.tabContentsVisibility.map((_, index) => index === tabIndex);


      this.getData();
  }

  getData() {
    this.ticketService.getAll().subscribe(
      (data: Ticket[]) => {
        this.allDeparturesDataSource.data = data;
        this.allDeparturesDataSource.paginator = this.paginator;
        this.allDeparturesDataSource.sort = this.sort;

        const today = new Date();
        this.todayDeparturesDataSource.data = data.filter(
          (ticket) => new Date(ticket.tic_hora).toLocaleDateString() === today.toLocaleDateString()
        );
        this.todayDeparturesDataSource.paginator = this.paginator;
        this.todayDeparturesDataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
