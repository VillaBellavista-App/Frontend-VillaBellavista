import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DriverDialogComponent} from "../driver-dialog/driver-dialog.component";
import {Owner} from "../models/owner";
import {OwnerService} from '../services/owner.service';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})

export class DriversComponent implements OnInit{
  displayedColumns: string[] = [ 'name_lastname', 'n_licencia', 'class', 'revalt_date', 'actions'];
  allDriversDataSource: MatTableDataSource<Owner> = new MatTableDataSource<Owner>();
  validDriversDataSource: MatTableDataSource<Owner> = new MatTableDataSource<Owner>();
  invalidDriversDataSource: MatTableDataSource<Owner> = new MatTableDataSource<Owner>();
    tabContentsVisibility: boolean[] = [true, false, false];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private dialog: MatDialog, private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.getDataForTab(1);
  }

  openDriverDialog(driver?: Owner): void {
    const dialogRef = this.dialog.open(DriverDialogComponent, {
      data: driver,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (driver) {
          const index = this.allDriversDataSource.data.findIndex((d) => d === driver);
          if (index !== -1) {
            this.allDriversDataSource.data[index] = result;
            this.allDriversDataSource.data = [...this.allDriversDataSource.data];
          }
        } else {
          this.allDriversDataSource.data.push(result);
          this.allDriversDataSource.data = [...this.allDriversDataSource.data];
        }
      }
    });
  }
    toggleTab(tabIndex: number, e: MouseEvent): void {
        this.activeTab = tabIndex;

        const line = this.line.nativeElement as HTMLElement;

        if (e.target instanceof HTMLElement) {
            line.style.width = e.target.offsetWidth - 27 + 'px';
            line.style.left = e.target.offsetLeft + 12 + 'px';
        }

        // Cambiar la visibilidad del contenido
        this.tabContentsVisibility = this.tabContentsVisibility.map((_, index) => index === tabIndex);
        console.log(this.tabContentsVisibility)
        console.log(tabIndex)
        // Actualizar el paginator y cargar los datos correspondientes
        this.getDataForTab(tabIndex);
    }
  deleteDriver(driver: Owner): void {
    // Encontrar el índice del departure en el dataSource
    const index = this.allDriversDataSource.data.findIndex(d => d === driver);

    // Si se encuentra el departure, eliminarlo del dataSource
    if (index !== -1) {
      this.allDriversDataSource.data.splice(index, 1);
      this.allDriversDataSource.data = [...this.allDriversDataSource.data];
    }
  }

  getDataForTab(tabIndex: number): void {
        this.ownerService.getAll().subscribe(
            (data: Owner[]) => {
                this.allDriversDataSource.data = data;
                this.allDriversDataSource.paginator = this.paginator;
                this.allDriversDataSource.sort = this.sort;
                const today = new Date();

                switch (tabIndex) {
                    case 0:
                        // Mostrar todos los registros
                        break;
                    case 1:
                        // Filtrar y mostrar registros válidos
                        this.validDriversDataSource.data = data.filter(
                            (owner) => new Date(owner.prop_fecha_revalidacion) >= today
                        );
                        this.validDriversDataSource.paginator = this.paginator;
                        this.validDriversDataSource.sort = this.sort;
                        break;
                    case 2:
                        // Filtrar y mostrar registros inválidos
                        this.invalidDriversDataSource.data = data.filter(
                            (owner) => new Date(owner.prop_fecha_revalidacion) < today
                        );
                        this.invalidDriversDataSource.paginator = this.paginator;
                        this.invalidDriversDataSource.sort = this.sort;
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
