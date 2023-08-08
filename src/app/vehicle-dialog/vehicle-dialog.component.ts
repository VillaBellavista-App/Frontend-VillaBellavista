import {Component, Inject} from '@angular/core';
import {Vehicule} from "../models/vehicule";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VehiculesService} from '../services/vehicules.service';
import {OwnerService} from '../services/owner.service';
import {Owner} from '../models/owner';
import {DestinationService} from '../services/destination.service';
import {Destination} from '../models/destination';

import { MatSelect } from '@angular/material/select';
import {MatSelectModule} from '@angular/material/select';

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

    if (this.isEditMode) {
      this.vehiculeService.updateVehicle(this.editedVehicle.veh_id, this.editedVehicle).subscribe(
        response => {
          console.log('Solicitud PUT exitosa:', response);
        },
        error => {
          console.error('Error en la solicitud PUT:', error);
        }
      );
    } else {
      this.vehiculeService.createVehicule(this.editedVehicle).subscribe(
        response => {
          console.log('Solicitud POST exitosa:', response);
        },
        error => {
          console.error('Error en la solicitud POST:', error);
        }
      );
    }

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
