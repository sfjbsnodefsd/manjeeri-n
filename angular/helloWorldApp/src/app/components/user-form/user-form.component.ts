import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  title: string = 'User Form - Fill out the form below:';
  name= 'Manjeeri';
  age = 27;
  gender = 'male'

  save() {
    console.log(`${this.name} is ${this.age} years old and gender is ${this.gender} `)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
