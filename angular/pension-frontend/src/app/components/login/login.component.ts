import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isAlert : boolean = false
  message : string = ''
  alertClass : string = ''

  loginForm = new FormGroup({
    adharno: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private _authService: AuthService,
    private _authStorageService: LocalstorageService,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  login() {
    this._authService.login(this.loginForm.value).subscribe((res: any) => {
      this.message = res.message
      this.isAlert = true
    if(res.status) { // success
      this.alertClass = 'success';
      //store token to local storage
      this._authStorageService.set('token',res.token);
      this._authStorageService.set('aadhar',res.adharno);
      //redirect to home
      this._router.navigateByUrl('/home');
    } else { // failed to create
      this.alertClass = 'warning';
    }
  })
  }

}
