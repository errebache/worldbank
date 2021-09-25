import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataFilter, Region } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	filter:DataFilter[]=[];
	@Output() filterChange = new EventEmitter();

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
			startYear: [],
			endYear: [],
		});
	}

	searchCountry() {
		this.filter = this.filterForm.value;
		this.filterChange.emit(this.filter);
		console.log(this.filterForm.value);
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
