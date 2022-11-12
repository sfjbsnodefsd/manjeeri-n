import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { LocalstorageService } from './localstorage.service'

@Injectable({
  providedIn: 'root'
})
export class PensionDetailsService {

  constructor(
    private http: HttpClient,
    private _authStorageService: LocalstorageService
    ) { }
    
  rootURL =`${environment.pensionerDetail}`;

  token =  this._authStorageService.get('token');
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  pensionerDetail(aadharNo: string) {  
    return this.http.get(this.rootURL + '/pensioner/'+aadharNo,this.httpOptions);
  }

  calculatePension(aadharNo: string) { 
    return this.http.post(environment.calculatePension + '/ProcessPension',{adharno:aadharNo}, this.httpOptions);
  }
  
}
