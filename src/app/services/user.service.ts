import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import User from '../interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headerOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private userSubject: BehaviorSubject<User | null>;
  user: Observable<User | null>;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(
        `${environment.apiUrl}/api/auth/login`,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: this.headerOptions,
        }
      )
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
