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
	private countriesList = new BehaviorSubject<DataCountries[]>([]);

	countries = this.countriesList.asObservable();

	apiURL = 'http://api.worldbank.org/v2/';

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

	getcountries(
		region: string,
		element: Array<string>,
		startYear: number,
		endYear: number
	): Observable<Countries> {
		let indicators = element.join(';');
		console.log(indicators);
		return this.http
			.get<Countries>(
				`${this.apiURL}country/${region}/indicator/${indicators}?source=2&format=json&date=${startYear}:${endYear}`
			)
			.pipe(retry(1), catchError(this.handleError));

		// return this.http
		// .get<Countries>(
		// 	`${this.apiURL}country/${filterData.region}/indicator/${filterData.indicator}?source=2&format=json&${filterData.startYear}:${filterData.endYear}`
		// )
		// .pipe(retry(1), catchError(this.handleError));
	}

	getRegions() {
		return this.http
			.get<Region>(this.apiURL + 'region?format=json')
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
