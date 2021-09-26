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
