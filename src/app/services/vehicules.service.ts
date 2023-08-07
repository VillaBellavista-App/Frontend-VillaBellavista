import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Vehicule} from "../models/vehicule";
import {FormControl, ɵFormGroupRawValue, ɵFormGroupValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class VehiculesService {

  // Endpoint Backend
  basePath = 'http://127.0.0.1:8000/app/vehicules';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  }

  constructor(private http: HttpClient) {}

    // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  getAll(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.basePath}/list`, this.httpOptions);
  }

  createVehicule(vehicule: Vehicule): Observable<any> {
    return this.http.post<any>(`${this.basePath}/create`, vehicule, this.httpOptions);
  }

  deleteVehicule(id: number): Observable<Vehicule> {
    return this.http.delete<Vehicule>(`${this.basePath}/${id}`, this.httpOptions);
  }

}