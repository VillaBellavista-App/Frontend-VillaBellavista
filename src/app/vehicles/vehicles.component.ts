import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {VehicleDialogComponent} from "../vehicle-dialog/vehicle-dialog.component";

//placa propietario cat marca modelo añof serie asientos color carroceria motor
export interface Vehicle{
  plate: string;
  owner: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  serie: string;
  seats: number;
  color: string;
  bodywork: string;
  engine: string;
}
const VEHICLE_DATA: Vehicle[] = [
  {plate: 'M3R-300', owner: 'KENJI MOZOMBITE TAPIA', category: 'M1', brand: 'TOYOTA', model: 'YARIS', year: 2019, serie: '123456789', seats: 5, color: 'BLANCO', bodywork: 'SEDAN', engine: '1.5'},
  {plate: 'M3R-300', owner: 'KENJI MOZOMBITE TAPIA', category: 'M1', brand: 'TOYOTA', model: 'YARIS', year: 2019, serie: '123456789', seats: 5, color: 'BLANCO', bodywork: 'SEDAN', engine: '1.5'},
  {plate: 'M3R-300', owner: 'KENJI MOZOMBITE TAPIA', category: 'M1', brand: 'TOYOTA', model: 'YARIS', year: 2019, serie: '123456789', seats: 5, color: 'BLANCO', bodywork: 'SEDAN', engine: '1.5'},
  {plate: 'M3R-300', owner: 'KENJI MOZOMBITE TAPIA', category: 'M1', brand: 'TOYOTA', model: 'YARIS', year: 2019, serie: '123456789', seats: 5, color: 'BLANCO', bodywork: 'SEDAN', engine: '1.5'},
  {plate: 'M3R-300', owner: 'KENJI MOZOMBITE TAPIA', category: 'M1', brand: 'TOYOTA', model: 'YARIS', year: 2019, serie: '123456789', seats: 5, color: 'BLANCO', bodywork: 'SEDAN', engine: '1.5'},
  {plate: 'M3R-300', owner: 'KENJI MOZOMBITE TAPIA', category: 'M1', brand: 'TOYOTA', model: 'YARIS', year: 2019, serie: '123456789', seats: 5, color: 'BLANCO', bodywork: 'SEDAN', engine: '1.5'},
];
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit{
  displayedColumns: string[] = [ 'plate', 'owner', 'category', 'brand', 'model', 'year', 'serie', 'seats', 'color', 'bodywork', 'engine', 'actions'];
  dataSource = VEHICLE_DATA;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl) {}
  ngOnInit(): void {
    console.log('DriversComponent ngOnInit');
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  }
  openVehicleDialog(vehicle?: Vehicle): void {
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
  deleteVehicle(vehicle: Vehicle): void {
    // Encontrar el índice del vehicle en el dataSource
    const index = this.dataSource.findIndex(d => d === vehicle);

    // Si se encuentra el vehicle, eliminarlo del dataSource
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }
}
