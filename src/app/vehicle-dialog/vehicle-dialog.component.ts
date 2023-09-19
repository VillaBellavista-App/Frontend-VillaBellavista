import {Component, Inject, OnInit} from '@angular/core';
import {Vehicule} from "../models/vehicule";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VehiculesService} from '../services/vehicules.service';
import {OwnerService} from '../services/owner.service';
import {Owner} from '../models/owner';
import {DestinationService} from '../services/destination.service';
import {Destination} from '../models/destination';
import { MatSelect } from '@angular/material/select';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.css']
})

export class VehicleDialogComponent implements OnInit{
  vehiclesForm!: FormGroup;

  editedVehicle: Vehicule = {} as Vehicule
  isEditMode: boolean;
  arrayOwners: string[] = [];
  arrayDestination: string[] = [];
  categoryArray: string[] = ["M1", "N1"];

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Vehicule,
  private vehiculeService: VehiculesService, private ownerService: OwnerService,
  private destinationService: DestinationService,
  private formBuilder: FormBuilder
  ) {
    this.isEditMode = !!data;
    if (this.isEditMode) {
      this.editedVehicle = { ...data };
    }
  }

  ngOnInit(): void {
    this.getOwners();
    this.getDestination();
    this.createForm();
  }
  createForm() {
    this.vehiclesForm = this.formBuilder.group({
      veh_placa: [
        this.editedVehicle.veh_placa,
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]{3}-[0-9]{3}$/)]
      ],
      owner_name: [
        this.editedVehicle.owner_name,
        [Validators.required,]
      ],
      veh_categoria: [
        this.editedVehicle.veh_categoria,
        [Validators.required]
      ],
      veh_marca: [
        this.editedVehicle.veh_marca,
        [Validators.required, Validators.pattern(/^[A-Za-z ]+$/) ]
      ],
      veh_modelo: [
        this.editedVehicle.veh_modelo,
        [Validators.required, Validators.pattern(/^[A-Za-z ]+$/) ]
      ],
      veh_anio_fabricacion: [
        this.editedVehicle.veh_anio_fabricacion,
        [Validators.required, Validators.pattern(/^[0-9]{4}$/)]
      ],
      destino_name: [
        this.editedVehicle.destino_name,
        [Validators.required]
      ],
      veh_nro_asientos: [
        this.editedVehicle.veh_nro_asientos,
        [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]
      ],
    });
    }

  onSave(): void {
    if (this.vehiclesForm.valid) {
      this.editedVehicle = this.vehiclesForm.value;
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
    }else {
      console.error('El formulario no es válido. Por favor, complete todos los campos.');
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
