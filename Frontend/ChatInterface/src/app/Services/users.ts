import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environnement/environnement';
import { Observable } from 'rxjs';
import { users } from '../Models/Users.models';
import { Page } from '../Models/Page.models';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor(private Http: HttpClient, private cookie: CookieService) {}

  public addUser(user: users): Observable<users> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.post<users>(environment.apiUrl + '/user', user, {
      headers,
    });
  }

  public updateUser(id: number, user: users): Observable<users> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.put<users>(environment.apiUrl + `/user/${id}`, user, {
      headers,
    });
  }

  public deleteUser(id: number): Observable<any> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.delete<any>(environment.apiUrl + `/user/${id}`, {
      headers,
    });
  }

  public getUserById(id: number): Observable<users> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<users>(environment.apiUrl + `/user/${id}`, {
      headers,
    });
  }

  public getAllUsers(number: number, size: number): Observable<Page<users>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<users>>(
      environment.apiUrl + `/user?page=${number}&size=${size}`,
      { headers }
    );
  }
  public searchUsers(nom: String): Observable<Page<Users>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<Users>>(
      environment.apiUrl + `/user/search?nom=${nom}`,
      { headers }
    );
  }
  public getFollowers(
    size: number,
    number: number,
    userId: number
  ): Observable<Page<Users>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<Users>>(
      environment.apiUrl +
        `/user/followers/${userId}?page=${number}&size=${size}`,
      {
        headers,
      }
    );
  }
  public getFollowed(
    size: number,
    number: number,
    userId: number
  ): Observable<Page<Users>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<Users>>(
      environment.apiUrl +
        `/user/followed/${userId}?page=${number}&size=${size}`,
      {
        headers,
      }
    );
  }
  public follow(userId: number, targetId: number): Observable<void> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.post<void>(
      environment.apiUrl + `/user/follow/${userId}/${targetId}`,
      { headers }
    );
  }
  public unfollow(userId: number, targetId: number): Observable<void> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.delete<void>(
      environment.apiUrl + `/user/unfollow/${userId}/${targetId}`,
      { headers }
    );
  }
}
