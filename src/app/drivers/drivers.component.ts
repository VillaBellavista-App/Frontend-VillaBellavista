import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DriverDialogComponent} from "../driver-dialog/driver-dialog.component";
import {Owner} from "../models/owner";
import {OwnerService} from '../services/owner.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})

export class DriversComponent implements OnInit{
  displayedColumns: string[] = [ 'name_lastname', 'n_licencia', 'class', 'revalt_date', 'actions'];
  dataSource = [] as Owner[];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private ownerService: OwnerService) {}

  ngOnInit(): void {
    console.log('DeparturesComponent ngOnInit');
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.getData();
  }

  openDriverDialog(driver?: Owner): void {
    const dialogRef = this.dialog.open(DriverDialogComponent, {
      data: driver // Si driver está presente, estamos en modo de edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (driver) {
          // Modo edición - actualizamos los datos del driver en el dataSource
          const index = this.dataSource.findIndex(d => d === driver);
          if (index !== -1) {
            this.dataSource[index] = result;
            this.dataSource = [...this.dataSource];
          }
        } else {
          // Modo añadir - agregamos el nuevo Driver al dataSource
          this.dataSource.push(result);
          this.dataSource = [...this.dataSource];
        }
      }
    });
  }

  deleteDriver(driver: Owner): void {
    // Encontrar el índice del departure en el dataSource
    const index = this.dataSource.findIndex(d => d === driver);

    // Si se encuentra el departure, eliminarlo del dataSource
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  getData(){
    this.ownerService.getAll().subscribe(
      (data: Owner[]) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
