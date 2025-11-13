import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environnement/environnement';
import { Observable } from 'rxjs';
import { User } from '../Models/Users.models';
import { Page } from '../Models/Page.models';

@Injectable({
  providedIn: 'root',
})
export class Users {
  constructor(private Http: HttpClient, private cookie: CookieService) {}

  public addUser(user: User): Observable<User> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.post<User>(environment.apiUrl + '/user', user, {
      headers,
    });
  }

  public updateUser(id: number, user: User): Observable<User> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.put<User>(environment.apiUrl + `/user/${id}`, user, {
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

  public getUserById(id: number): Observable<User> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<User>(environment.apiUrl + `/user/${id}`, {
      headers,
    });
  }

  public getAllUsers(number: number, size: number): Observable<Page<User>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<User>>(
      environment.apiUrl + `/user?page=${number}&size=${size}`,
      { headers }
    );
  }
  public searchUsers(nom: String, id: number): Observable<Page<User>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<User>>(
      environment.apiUrl + `/user/search/${id}?nom=${nom}`,
      { headers }
    );
  }
  public convWithUsers(id: number): Observable<Page<User>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<User>>(
      environment.apiUrl + `/user/conv/userId=${id}`,
      { headers }
    );
  }
  public getFollowers(
    size: number,
    number: number,
    userId: number
  ): Observable<Page<User>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<User>>(
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
  ): Observable<Page<User>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<User>>(
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
      {},
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
