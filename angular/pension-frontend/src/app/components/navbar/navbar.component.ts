import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor( 
    private _authStorageService: LocalstorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {       
  }

  logout() {
   this._authStorageService.remove('token');
   this._authStorageService.remove('aadhar');
   this._router.navigateByUrl('/');
  }

}
