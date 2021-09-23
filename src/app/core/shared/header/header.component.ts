import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Region } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  regions:Region | undefined;
  constructor(public fb: FormBuilder,private countriesService:CountriesService) { }

  registrationForm = this.fb.group({
    cityName: ['']
  })

  onSubmit() {
    alert(JSON.stringify(this.registrationForm.value))
  }

  ngOnInit(): void {
    this.countriesService.getRegions().subscribe((data)=>{
      this.regions = data;
    })
  }


}
