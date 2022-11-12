import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  isAlert : boolean = false
  message : string = ''
  alertClass : string = ''

  registrationForm = new FormGroup({
    name: new FormControl(''),
    dob: new FormControl(''),
    password: new FormControl(''),
    pancard: new FormControl(''),
    adharno: new FormControl(''),
    salaryearned: new FormControl(''),
    allowances: new FormControl(''),
    pensiontype: new FormControl(''),
    bankdetail: new FormGroup({
      bankname: new FormControl(''),
      accountno: new FormControl(''),
      banktype: new FormControl('')
    })
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  createAccount() {
    this.authService.addUser(this.registrationForm.value).subscribe((res: any) => {
        this.message = res.message
        this.isAlert = true
      if(res.status){ // success
        this.alertClass = 'success';
        this.registrationForm.reset()
      } else { // failed to create
        this.alertClass = 'warning';
      }
    })
  }

}
