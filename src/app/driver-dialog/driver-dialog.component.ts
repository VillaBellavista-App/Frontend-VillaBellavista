import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Owner } from '../models/owner';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-driver-dialog',
  templateUrl: './driver-dialog.component.html',
  styleUrls: ['./driver-dialog.component.css']
})

export class DriverDialogComponent implements OnInit {
  driverForm!: FormGroup; // Añade el signo de exclamación para indicar que se inicializará en ngOnInit

  isEditMode: boolean;
  categoryArray: string[] = ["A1", "AII-A", "AII-B", "AIII-A", "AIII-B"];
  editedDriver: Owner = {} as Owner; // Inicializa editedDriver

  constructor(
    public dialogRef: MatDialogRef<DriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Owner,
    private ownerService: OwnerService,
    private formBuilder: FormBuilder
  ) {
    this.isEditMode = !!data;
    if (this.isEditMode) {
      this.editedDriver = { ...data };
    }
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.driverForm = this.formBuilder.group({
      prop_nombre: [
        //el nombre solo puede contener letras pero tambien puede tener espacios
        this.editedDriver.prop_nombre,
        [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]
      ],
      prop_apellidos: [
        this.editedDriver.prop_apellidos,
        [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]
      ],
      //la licencia comienza con una letra y tiene 8 números
      prop_licencia: [
        this.editedDriver.prop_licencia,
        [Validators.required, Validators.pattern(/^[a-zA-Z]{1}[0-9]{8}$/)]
      ],
      prop_categoria: [this.editedDriver.prop_categoria, Validators.required],
      //el formato de la fecha es aaaa-mm-dd, con guiones
      prop_fecha_revalidacion: [
        this.editedDriver.prop_fecha_revalidacion,
        [Validators.required, Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)],
      ]
    });
  }

  onSave(): void {
    if (this.driverForm.valid) {
      this.editedDriver = this.driverForm.value;
      this.dialogRef.close(this.editedDriver);
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
    } else {
      console.error('El formulario no es válido. Por favor, complete todos los campos.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
