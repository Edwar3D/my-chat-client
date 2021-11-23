import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient ) {
  }


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL , { responseType: 'text' });
  }

  getUser(id_user:any, token:any): Observable<any> {
    return this.http.get(API_URL + 'user',  {
      params:{
        id:id_user
      },
      headers:
        new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `Bearer ${token}`})

     });
  }
}
