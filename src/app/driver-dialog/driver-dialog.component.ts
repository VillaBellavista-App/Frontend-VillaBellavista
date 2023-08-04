import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Owner } from '../models/owner';


@Component({
  selector: 'app-driver-dialog',
  templateUrl: './driver-dialog.component.html',
  styleUrls: ['./driver-dialog.component.css']
})
export class DriverDialogComponent implements OnInit{
  editedDriver: Owner;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<DriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Owner
  ) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedDriver = this.isEditMode ? { ...data } : {} as Owner;
  }

  ngOnInit(): void {}

  onSave(): void {
    // Puedes realizar validaciones y lógica antes de cerrar el diálogo
    this.dialogRef.close(this.editedDriver); // Devolvemos el Departure editado
  }

  onCancel(): void {
    // Si el usuario cancela, simplemente cerramos el diálogo sin guardar cambios
    this.dialogRef.close();
  }
}
