import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {VehicleDialogComponent} from "../vehicle-dialog/vehicle-dialog.component";
import {Vehicule} from "../models/vehicule";
import { VehiculesService } from '../services/vehicules.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  displayedColumns: string[] = [ 'plate', 'owner', 'category', 'brand', 'model', 'year', 'serie', 'seats', 'actions'];
  
  dataSource = [] as Vehicule[];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private vehiculeService: VehiculesService) {}

  ngOnInit(): void {
    console.log('DriversComponent ngOnInit');
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.getData();
  }

  openVehicleDialog(vehicle?: Vehicule): void {
    const dialogRef = this.dialog.open( VehicleDialogComponent, {
      data: vehicle // Si vehicle está presente, estamos en modo de edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (vehicle) {
          // Modo edición - actualizamos los datos del vehicle en el dataSource
          const index = this.dataSource.findIndex(d => d === vehicle);
          if (index !== -1) {
            this.dataSource[index] = result;
            this.dataSource = [...this.dataSource];
          }
        } else {
          // Modo añadir - agregamos el nuevo Vehicle al dataSource
          this.dataSource.push(result);
          this.dataSource = [...this.dataSource];
        }
      }
    });
  }
  deleteVehicle(vehicle: Vehicule): void {
    // Encontrar el índice del vehicle en el dataSource
    const index = this.dataSource.findIndex(d => d === vehicle);

    // Si se encuentra el vehicle, eliminarlo del dataSource
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  getData(){
    this.vehiculeService.getAll().subscribe(
      (data: Vehicule[]) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
