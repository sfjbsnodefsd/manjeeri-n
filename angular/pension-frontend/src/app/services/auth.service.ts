import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  rootURL =`${environment.authApiUrl}/auth`;

  addUser(user: any) {
    return this.http.post(this.rootURL + '/reg', user);
  }

  login(creds: any) {
    return this.http.post(this.rootURL + '/login', creds);
  }

}
