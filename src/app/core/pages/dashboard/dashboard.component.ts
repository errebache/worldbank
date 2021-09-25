import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
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
	filterData: DataFilter = {region:'Regions',indicator:[],startYear:2000,endYear:2002};
	constructor(private contiesService: CountriesService) {}

	ngOnInit(): void {
		this.loadCountries(this.filterData);
	}

	filterCountry(event:DataFilter){
	    this.loadCountries(event);
	}

	// Get countries list
	getCountries(filter:DataFilter) {
		return this.contiesService
			.getcountries(filter?.region, ['AG.AGR.TRAC.NO', 'SP.POP.TOTL'], filter?.startYear, filter?.endYear)
			.subscribe((data) => {
				let result: any = [];
				result = data;
				this.countries = result[1];
				console.log(data);
				this.setCountries(this.countries);
			});
	}

	setCountries(countries: DataCountries[]) {
		this.contiesService.setListCountries(countries);
	}

    
    // loadCountries(filterData:DataFilter) {
        
    //     if(filterData.region == 'Regions' && filterData.startYear == null && filterData.endYear == null){
	// 		filterData = {region:'AEF',indicator:[],startYear:2000,endYear:2002};
	// 		this.getCountries(filterData);
    //     } else if(filterData.startYear !== null && filterData.endYear !== null){
	// 		this.getCountries(filterData);
	// 	}

    // }


	loadCountries(filterData:DataFilter) {
		(filterData?.region == 'Regions') ? filterData.region = 'AFE' : filterData.region;
		(filterData.startYear == null) ? filterData.startYear = 2001 : filterData.startYear;
		(filterData.endYear == null) ? filterData.endYear = 2002 : filterData.endYear;
		
		if(filterData.startYear !== null && filterData.endYear !== null){
			this.getCountries(filterData);
		}

	}
	
}
