import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  createAccount() {
    console.warn(this.registrationForm.value);
  }

}
