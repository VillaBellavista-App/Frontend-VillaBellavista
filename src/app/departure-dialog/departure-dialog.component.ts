import { Component, Inject, OnInit, HostListener} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../models/ticket';
import { TicketPost } from '../models/ticketPost';
import { VehiculesService } from '../services/vehicules.service';
import { TicketService } from '../services/ticket.service';
import { Vehicule } from '../models/vehicule';
import { Location } from '@angular/common';

@Component({
  selector: 'app-departure-dialog',
  templateUrl: './departure-dialog.component.html',
  styleUrls: ['./departure-dialog.component.css']
})

export class DepartureDialogComponent implements OnInit {
  editedDeparture: Ticket;
  isEditMode: boolean;
  vehicle_response: TicketPost | undefined;

  constructor(
    public dialogRef: MatDialogRef<DepartureDialogComponent>, private vehicleService: VehiculesService, private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: Ticket, private location: Location
  ) {
    this.isEditMode = !!data; // Si data tiene valor, estamos en modo edición
    this.editedDeparture = this.isEditMode ? { ...data } : {} as Ticket;
  }

  ngOnInit(): void {}

  onSave(): void {
    const plate = this.editedDeparture.tic_placa;

    this.vehicleService.getVehicleIdByPlate(plate).subscribe(
      (vehicleIds: Vehicule[]) => {

          const vehicle_id = vehicleIds[0].veh_id; // Obtener el veh_id del primer elemento del array
          const newTicket: TicketPost = {
            vehicule_id: vehicle_id,
            // Otras propiedades del TicketPost que desees inicializar...
          };
          
          // Asignar el objeto newTicket a vehicle_response
          this.vehicle_response = newTicket;

          this.ticketService.createTicket(this.vehicle_response).subscribe(
            response => {
              console.log('Solicitud POST exitosa:', response);
            },
            error => {
              console.error('Error en la solicitud POST:', error);
            }
          );

          // Cerrar el diálogo después de realizar la operación
          this.dialogRef.close(this.editedDeparture);
          window.location.reload();
      },
      error => {
        console.error('Error al obtener el ID del vehículo:', error);
        // Manejar el error si es necesario
      }
    );
  }

  onCancel(): void {
    // Si el usuario cancela, simplemente cerramos el diálogo sin guardar cambios
    this.dialogRef.close();
  }
}
