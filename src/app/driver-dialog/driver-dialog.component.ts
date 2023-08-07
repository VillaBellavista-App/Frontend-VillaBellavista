import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Owner } from '../models/owner';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-driver-dialog',
  templateUrl: './driver-dialog.component.html',
  styleUrls: ['./driver-dialog.component.css']
})
export class DriverDialogComponent implements OnInit{
  editedDriver: Owner;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<DriverDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Owner, 
    private ownerService: OwnerService) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedDriver = this.isEditMode ? { ...data } : {} as Owner;
  }

  ngOnInit(): void {}

  onSave(): void {

    this.dialogRef.close(this.editedDriver); // Devolvemos el Departure editado
    
    if (this.isEditMode) {
      this.ownerService.updateOwner(this.editedDriver.prop_id, this.editedDriver).subscribe(
        response => {
          console.log('Solicitud PUT exitosa:', response);
        },
        error => {
          console.error('Error en la solicitud PUT:', error);
        }
      );
    } else {
      this.ownerService.createOwner(this.editedDriver).subscribe(
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

}
