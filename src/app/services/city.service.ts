import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import ICityWithoutPointOfInterest from '../interfaces/ICityWithoutPointOfInterest';
import { environment } from 'src/environments/environment';
import ICity from '../interfaces/ICity';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  headerOptions = new HttpHeaders({
    Authorization: `Bearer ${this.userService.userValue?.token}`,
  });

  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient
  ) {}

  all(): Observable<ICityWithoutPointOfInterest[]> {
    return this.http
      .get<ICityWithoutPointOfInterest[]>(`${environment.apiUrl}/api/cities`, {
        headers: this.headerOptions,
      })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<ICity> {
    return this.http
      .get<ICity>(
        `${environment.apiUrl}/api/cities/${id}?includePointsOfInterest=true`,
        {
          headers: this.headerOptions,
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMsg = '';

    if (err.error instanceof ErrorEvent) {
      // Client-side or network error.
      errorMsg = `An error ocurred: ${err.error.message}`;
    } else {
      // Unsuccessful response code. Body could contain additional information.
      errorMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.error(errorMsg);
    return throwError(() => errorMsg);
  }
}
