import { Component, OnInit } from '@angular/core';
import {
	Countries,
	DataCountries,
	DataFilter,
} from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	countries: DataCountries[] = [];
	filterData!: DataFilter;
	constructor(private contiesService: CountriesService) {}

	ngOnInit(): void {
		this.loadCountries();
	}

	// Get countries list
	loadCountries() {
		return this.contiesService
			.getcountries('AFE', ['AG.AGR.TRAC.NO', 'SP.POP.TOTL'], 2000, 2021)
			.subscribe((data) => {
				let result: any = [];
				result = data;
				this.countries = result[1];
				this.setCountries(this.countries);
				console.log(this.countries);
			});
	}

	setCountries(countries: DataCountries[]) {
		this.contiesService.setListCountries(countries);
	}
}
