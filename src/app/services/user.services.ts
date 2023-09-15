import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "../models/user";
//import {UserPost} from "../models/userPost";
import {FormControl, ɵFormGroupRawValue, ɵFormGroupValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Endpoint Backend
  //basePath = 'https://villa-bellavista-app.onrender.com/app/user';
  basePath = 'http://127.0.0.1:8000/app/user';

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

  getCurrentUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.basePath}/${username}`, this.httpOptions)
  }

  authenticate(email: string, password: string): Observable<User[]> {
    const url = `${this.basePath}/authenticate/${email}/${password}`;
    return this.http.get<User[]>(url);
  }


  create(user: ɵTypedOrUntyped<{user_nombre: FormControl<string | null>; user_apellidos: FormControl<string | null>; user_email: FormControl<string | null>; user_password: FormControl<string | null> }, 
    ɵFormGroupValue<{user_nombre: FormControl<string | null>; user_apellidos: FormControl<string | null>; user_email: FormControl<string | null>; user_password: FormControl<string | null>  }>, any>): 
    Observable<User> {
    return this.http.post<User>(`${this.basePath}/create`, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  delete(id: any) {
    return this.http.delete(`${this.basePath}/delete/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}