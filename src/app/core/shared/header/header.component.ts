import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  constructor(public fb: FormBuilder) { }

  registrationForm = this.fb.group({
    cityName: ['']
  })

  onSubmit() {
    alert(JSON.stringify(this.registrationForm.value))
  }

  ngOnInit(): void {
  }


}
