import {Component, Inject} from '@angular/core';
import {Vehicule} from "../models/vehicule";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent {
  editedVehicle: Vehicule;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicule
  ) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedVehicle = this.isEditMode ? { ...data } : {} as Vehicule;
  }

  ngOnInit(): void {}

  onSave(): void {
    // Puedes realizar validaciones y lógica antes de cerrar el diálogo
    this.dialogRef.close(this.editedVehicle); // Devolvemos el Vehicle editado
  }

  onCancel(): void {
    // Si el usuario cancela, simplemente cerramos el diálogo sin guardar cambios
    this.dialogRef.close();
  }
}
