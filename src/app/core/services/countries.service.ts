import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
	Countries,
	DataCountries,
	DataFilter,
	Region,
} from '../models/countries.model';

@Injectable({
	providedIn: 'root',
})
export class CountriesService {
    	
	apiURL = 'http://api.worldbank.org/v2/';
	format = 'format=json';

	private countriesList = new BehaviorSubject<DataCountries[]>([]);
    private allIndicators = new BehaviorSubject<DataCountries[]>([])
	countries = this.countriesList.asObservable();
    indicators = this.allIndicators.asObservable();

   indicatorsSelect = [
	   {
		id: "NY.GDP.MKTP.CD",
		value: "GDP (current US$)"		
	   },
	   {
		id: "SP.POP.TOTL",
		value: "Population, total"		
	   },
	   {
		id: "NE.IMP.GNFS.CD",
		value: "Imports of goods and services (current US$)"		
	   }
	   ,{
		id: "NY.ADJ.NNTY.PC.CD",
		value: "Adjusted net national income per capita (current US$)"		
	   },
	   {
		id: "SH.PRV.SMOK",
		value: "Prevalence of current tobacco use (% of adults)"		
	   },
	   {
		id: "SH.XPD.CHEX.GD.ZS",
		value: " Current health expenditure (% of GDP)"		
	   },
	   {
		id: "SP.DYN.LE00.IN",
		value: "Life expectancy at birth, total (years)"		
	   }
   ]

	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	constructor(private http: HttpClient) {}

	setListCountries(countries: DataCountries[]) {
		this.countriesList.next(countries);
	}

	setIndicators(indicator:DataCountries[]) {
      this.allIndicators.next(indicator);
	}

	getcountries(
		region: string,
		element: string,
		startYear: number,
		endYear: number
	): Observable<Countries> {
		// let indicators = element.join(';');
		// console.log(indicators);
		return this.http
			.get<Countries>(
				`${this.apiURL}country/${region}/indicator/${element}?source=2&${this.format}&date=${startYear}:${endYear}`
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	getRegions() {
		return this.http
			.get<Region>(`${this.apiURL}region?${this.format}`)
			.pipe(retry(1), catchError(this.handleError));
	}

	getIndicators() {
		return this.http
			.get<Region>(`${this.apiURL}indicator?${this.format}`)
			.pipe(retry(1), catchError(this.handleError));
	}
   

	getIndicatorById(country:string,indicator:string,date:number) {
		return this.http
		.get<Region>(`${this.apiURL}country/${country}/indicator/${indicator}?${this.format}&date=${date}`)
		.pipe(retry(1), catchError(this.handleError));
	}

	handleError(error: any) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		window.alert(errorMessage);
		return throwError(errorMessage);
	}
}
