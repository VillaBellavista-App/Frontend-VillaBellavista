import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {VehicleDialogComponent} from "../vehicle-dialog/vehicle-dialog.component";
import {Vehicule} from "../models/vehicule";
import {VehiculesService} from '../services/vehicules.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent implements OnInit {

  displayedColumns: string[] = [ 'plate', 'owner', 'category', 'brand', 'model', 'year', 'serie', 'seats', 'actions'];
  tabContentsVisibility: boolean[] = [true, false];
  allVehiculesDataSource: MatTableDataSource<Vehicule> = new MatTableDataSource<Vehicule>();
  filterVehiculesDataSource: MatTableDataSource<Vehicule> = new MatTableDataSource<Vehicule>();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private dialog: MatDialog, private vehiculeService: VehiculesService) {}

  ngOnInit(): void {
    this.getDataForTab(0);
  }

  openVehicleDialog(vehicle?: Vehicule): void {
    const dialogRef = this.dialog.open( VehicleDialogComponent, {
      data: vehicle // Si vehicle está presente, estamos en modo de edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (vehicle) {
          // Modo edición - actualizamos los datos del vehicle en el dataSource
          const index = this.allVehiculesDataSource.data.findIndex(d => d === vehicle);

          if (index !== -1) {
            this.allVehiculesDataSource.data[index] = result;
            this.allVehiculesDataSource.data = [...this.allVehiculesDataSource.data];
          }

        } else {
          // Modo añadir - agregamos el nuevo Vehicle al dataSource
          this.allVehiculesDataSource.data.push(result);
          this.allVehiculesDataSource.data = [...this.allVehiculesDataSource.data];
        }
      }
    });
  }

  deleteVehicle(vehicle: Vehicule): void {

    const idToDelete = vehicle.veh_id;

    // Encontrar el índice del vehicle en el dataSource
    const index = this.allVehiculesDataSource.data.findIndex(d => d === vehicle);

    // Si se encuentra el vehicle, eliminarlo del dataSource
    if (index !== -1) {
      this.allVehiculesDataSource.data.splice(index, 1);
      this.allVehiculesDataSource.data = [...this.allVehiculesDataSource.data];

      this.vehiculeService.deleteVehicule(idToDelete).subscribe(data => {
        console.log(data);
      });
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
    console.log(tabIndex);
    this.getDataForTab(tabIndex);
  }

  getDataForTab(tabIndex: number):void{
    this.vehiculeService.getAll().subscribe(
      (data: Vehicule[]) => {
        const today = new Date();

        switch (tabIndex) {
          case 0:
            // Mostrar todos los registros
            this.allVehiculesDataSource.data = data;
            this.allVehiculesDataSource.paginator = this.paginator;
            this.allVehiculesDataSource.sort = this.sort;
            break;
          case 1:
            // Mostrar solo los vehiculos mas antiguos
            this.filterVehiculesDataSource.data = data.filter(
                (vehicle) => vehicle.veh_anio_fabricacion <= (today.getFullYear() - 5),
            );
            this.filterVehiculesDataSource.paginator = this.paginator;
            this.filterVehiculesDataSource.sort = this.sort;
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
