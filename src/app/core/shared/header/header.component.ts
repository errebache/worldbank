import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Region } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	filterForm: FormGroup;
	City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
	regions: any = [];
	constructor(
		public fb: FormBuilder,
		private countriesService: CountriesService
	) {
		this.filterForm = this.fb.group({
			region: ['Regions'],
			indicator: [''],
			strartYear: [''],
			endYear: [''],
		});
	}

	ngOnInit(): void {
		this.countriesService.getRegions().subscribe((data) => {
			let result: any = [];
			result = data;
			this.regions = result[1];
			console.log(this.regions);
		});
	}
}
