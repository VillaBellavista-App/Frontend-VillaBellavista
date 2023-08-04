import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DriverDialogComponent} from "../driver-dialog/driver-dialog.component";

export interface Driver{
  name_lastname: string;
  n_licencia: string;
  class: string;
  revalt_date: string;
  address_driver: string;
  actual_state: string;
  plate: string;
  cellphone: number;
}
const DRIVER_DATA: Driver[] = [
  { name_lastname: 'KENJI MOZOMBITE TAPIA', n_licencia: 'X73218735', class: 'Alb',revalt_date: '14/09/2021', address_driver: 'AV. LA MARINA 123', actual_state: 'VENCIDA', plate: 'M3R-300', cellphone: 995669460},
  { name_lastname: 'KENJI MOZOMBITE TAPIA', n_licencia: 'X73218735', class: 'Alb',revalt_date: '14/09/2021', address_driver: 'AV. LA MARINA 123', actual_state: 'VENCIDA', plate: 'M3R-300', cellphone: 995669460},
  { name_lastname: 'KENJI MOZOMBITE TAPIA', n_licencia: 'X73218735', class: 'Alb',revalt_date: '14/09/2021', address_driver: 'AV. LA MARINA 123', actual_state: 'VENCIDA', plate: 'M3R-300', cellphone: 995669460},
  { name_lastname: 'KENJI MOZOMBITE TAPIA', n_licencia: 'X73218735', class: 'Alb',revalt_date: '14/09/2021', address_driver: 'AV. LA MARINA 123', actual_state: 'VENCIDA', plate: 'M3R-300', cellphone: 995669460},
  { name_lastname: 'KENJI MOZOMBITE TAPIA', n_licencia: 'X73218735', class: 'Alb',revalt_date: '14/09/2021', address_driver: 'AV. LA MARINA 123', actual_state: 'VENCIDA', plate: 'M3R-300', cellphone: 995669460},
  { name_lastname: 'KENJI MOZOMBITE TAPIA', n_licencia: 'X73218735', class: 'Alb',revalt_date: '14/09/2021', address_driver: 'AV. LA MARINA 123', actual_state: 'VENCIDA', plate: 'M3R-300', cellphone: 995669460},
];
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit{
  displayedColumns: string[] = [ 'name_lastname', 'n_licencia', 'class', 'revalt_date', 'address', 'actual_state', 'plate', 'cellphone', 'actions'];
  dataSource = DRIVER_DATA;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl) {}
  ngOnInit(): void {
    console.log('DeparturesComponent ngOnInit');
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  openDriverDialog(driver?: Driver): void {
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

  deleteDriver(driver: Driver): void {
    // Encontrar el índice del departure en el dataSource
    const index = this.dataSource.findIndex(d => d === driver);

    // Si se encuentra el departure, eliminarlo del dataSource
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

}
