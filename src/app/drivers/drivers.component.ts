import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DriverDialogComponent} from "../driver-dialog/driver-dialog.component";
import {Owner} from "../models/owner";
import {OwnerService} from '../services/owner.service';
import {Ticket} from "../models/ticket";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})

export class DriversComponent implements OnInit{
  displayedColumns: string[] = [ 'name_lastname', 'n_licencia', 'class', 'revalt_date', 'actions'];
  dataSource = [] as Owner[];
  tabContentsVisibility: boolean[] = [true, false];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('line', { static: true }) line!: ElementRef;
  activeTab: number = 0;

  constructor(private dialog: MatDialog, private paginatorIntl: MatPaginatorIntl, private ownerService: OwnerService, private cdr: ChangeDetectorRef) {}

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
  deleteDeparture(owner: Owner): void {
    // Encontrar el índice del departure en el dataSource
    const index = this.dataSource.findIndex(d => d === owner);

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
