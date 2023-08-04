import {Component, Inject} from '@angular/core';
import {Vehicle} from "../vehicles/vehicles.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})
export class VehicleDialogComponent {
  editedVehicle: Vehicle;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle
  ) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedVehicle = this.isEditMode ? { ...data } : {} as Vehicle;
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
