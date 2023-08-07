import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Owner} from "../models/owner";
import {FormControl, ɵFormGroupRawValue, ɵFormGroupValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  // Endpoint Backend
  basePath = 'http://127.0.0.1:8000/app/owners';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  }

  constructor(private http: HttpClient) {
  }

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

  getAll(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${this.basePath}/list`, this.httpOptions);
  }

  createOwner(owner: Owner): Observable<any> {
    return this.http.post<any>(`${this.basePath}/create`, owner, this.httpOptions);
  } 

  updateOwner(id: number, updatedOwner: Owner): Observable<any> {
    const url = `${this.basePath}/${id}`;
    return this.http.put<any>(url, updatedOwner, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOwner(id: number): Observable<Owner> {
    return this.http.delete<Owner>(`${this.basePath}/${id}`, this.httpOptions);
  }
}   