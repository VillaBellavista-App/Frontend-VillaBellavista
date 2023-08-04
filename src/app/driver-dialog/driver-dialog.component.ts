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
    public dialogRef: MatDialogRef<DriverDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Owner, private ownerService: OwnerService) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedDriver = this.isEditMode ? { ...data } : {} as Owner;
  }

  ngOnInit(): void {}

  onSave(): void {

    this.dialogRef.close(this.editedDriver); // Devolvemos el Departure editado
    
    this.dialogRef.afterClosed().subscribe((result: Owner) => {
      if (result) {
        this.ownerService.createOwner(result).subscribe(
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
}
