import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departure } from '../departures/departures.component';

@Component({
  selector: 'app-departure-dialog',
  templateUrl: './departure-dialog.component.html',
  styleUrls: ['./departure-dialog.component.css']
})
export class DepartureDialogComponent implements OnInit {
  editedDeparture: Departure;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<DepartureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Departure
  ) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedDeparture = this.isEditMode ? { ...data } : {} as Departure;
  }

  ngOnInit(): void {}

  onSave(): void {
    // Puedes realizar validaciones y lógica antes de cerrar el diálogo
    this.dialogRef.close(this.editedDeparture); // Devolvemos el Departure editado
  }

  onCancel(): void {
    // Si el usuario cancela, simplemente cerramos el diálogo sin guardar cambios
    this.dialogRef.close();
  }
}
