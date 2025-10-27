import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environnement/environnement';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private Http: HttpClient, private cookie: CookieService) {}

  public register(fromData: any): Observable<any> {
    return this.Http.post<any>(
      environment.apiUrl + '/auth/register',
      fromData
    ).pipe(
      tap((response) => {
        this.cookie.set('token', response.token),
          this.cookie.set('user_Id', response.id),
          this.cookie.set('isAuth', response.isAuthenticated);
      })
    );
  }

  public Login(user: any): Observable<any> {
    return this.Http.post<any>(environment.apiUrl + '/auth/login', user).pipe(
      tap((response) => {
        this.cookie.set('token', response.token),
          this.cookie.set('user_Id', response.id),
          this.cookie.set('isAuth', response.isAuthenticated);
      })
    );
  }

  public logOut() {
    this.cookie.deleteAll;
  }
}
