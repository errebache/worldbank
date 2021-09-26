import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import {
	Countries,
	DataCountries,
	DataFilter,
	Indicator,
} from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';
import { Chart } from 'chart.js';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	countries: DataCountries[] = [];
	filterData: DataFilter = {region:'Regions',indicator:'',startYear:0,endYear:0};
	indicators:DataCountries[] = [];
	chart = [];

	constructor(private countriesService: CountriesService) {}

	ngOnInit(): void {
		this.loadCountries(this.filterData);
	}

	filterCountry(event:DataFilter){
	    this.loadCountries(event);
	}

	// Get countries list
	getCountries(filter:DataFilter) {
		return this.countriesService
			.getcountries(filter?.region, filter?.indicator, filter?.startYear, filter?.endYear)
			.subscribe((data) => {
				let result: any = [];
				result = data;
				this.countries = result[1];
				console.log(data);
				this.setCountries(this.countries);
			});
	}

	setCountries(countries: DataCountries[]) {
		this.countriesService.setListCountries(countries);
	}

	loadCountries(filterData:DataFilter) {
		(filterData?.region == 'Regions') ? filterData.region = 'AFE' : filterData.region;
		(filterData?.indicator == '') ? filterData.indicator = 'NY.GDP.MKTP.CD' : filterData.indicator;
		(filterData.startYear == null || filterData.startYear == 0) ? filterData.startYear = 2000 : filterData.startYear;
		(filterData.endYear == null || filterData.endYear == 0) ? filterData.endYear = 2001 : filterData.endYear;
		
		if(filterData.startYear !== null && filterData.endYear !== null){
			this.getCountries(filterData);
		}

	}

   selectedRow(event:DataCountries){
	   console.log(`%c je suis dans parent`,`color:red;font-size:20px`)
	   console.log(event);
			this.countriesService.getIndicatorById(event.country.id!,event.indicator.id!,event.date!).subscribe((data)=>{
			let result: any = [];
			result = data;
			this.indicators = result[1];
			this.countriesService.setIndicators(this.indicators);
			
	   })
   }
	
}
