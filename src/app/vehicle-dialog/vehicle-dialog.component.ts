import {Component, Inject} from '@angular/core';
import {Vehicule} from "../models/vehicule";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VehiculesService} from '../services/vehicules.service';
import {OwnerService} from '../services/owner.service';
import {Owner} from '../models/owner';
import {DestinationService} from '../services/destination.service';
import {Destination} from '../models/destination';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})

export class VehicleDialogComponent {
  editedVehicle: Vehicule;
  isEditMode: boolean;
  arrayOwners: string[] = [];
  arrayDestination: string[] = [];

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Vehicule, 
  private vehiculeService: VehiculesService, private ownerService: OwnerService, 
  private destinationService: DestinationService) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedVehicle = this.isEditMode ? { ...data } : {} as Vehicule;
  }

  ngOnInit(): void {
    this.getOwners();
    this.getDestination();
  }

  onSave(): void {
    // Puedes realizar validaciones y lógica antes de cerrar el diálogo
    this.dialogRef.close(this.editedVehicle); // Devolvemos el Vehicle editado

    this.dialogRef.afterClosed().subscribe((result: Vehicule) => {
      if (result) {
        this.vehiculeService.createVehicule(result).subscribe(
          response => {
            console.log('Solicitud POST exitosa:', response);
          },
          error => {
            console.error('Error en la solicitud POST:', error);
          }
        );
      } else {
        console.log('Diálogo cerrado sin guardar.');
      }
    });

  }

  onCancel(): void {
    // Si el usuario cancela, simplemente cerramos el diálogo sin guardar cambios
    this.dialogRef.close();
  }

  getOwners(){
    this.ownerService.getAll().subscribe(
      (data: Owner[]) => {
        data.forEach(element => {
          this.arrayOwners.push(element.prop_nombre);
        });
      },
      (error) => {
        console.log(error);
      }
    )
    console.log(this.arrayOwners);
  }

  getDestination(){
    this.destinationService.getAll().subscribe(
      (data: Destination[]) => {
        data.forEach(element => {
          this.arrayDestination.push(element.des_nombre);
        });
      },
      (error) => {
        console.log(error);
      }
    )
    console.log(this.arrayDestination);
  }
}
