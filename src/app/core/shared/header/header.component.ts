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
	@Output() filterChange = new EventEmitter();
	filter:DataFilter[]=[];
	filterForm: FormGroup;
	regions: any = [];
	indicators: any = [];

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

	ngOnInit(): void {
	  this.getRegion();
	  this.getIndicator();
	}

	searchCountry() {
		this.filter = this.filterForm.value;
		this.filterChange.emit(this.filter);
		console.log(this.filterForm.value);
	}


	getRegion() {
		this.countriesService.getRegions().subscribe((data) => {
			let result: any = [];
			result = data;
			this.regions = result[1];
		});
	}

	getIndicator() {
		this.indicators  = this.countriesService.indicatorsSelect;
	}

	
}
