import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Countries } from '../models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiURL = 'http://api.worldbank.org/v2/';
  public searchCountryUrl = this.apiURL + 'api/open/search-countries';
  public showGDPUrl = this.apiURL + 'api/open/show-gdp';
  
  constructor(private http:HttpClient) { }

 // Http Options
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
 }  

 getcountries(): Observable<Countries> {
  return this.http.get<Countries>(this.apiURL + 'country/all/indicator/SP.POP.TOTL?format=json')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}



handleError(error:any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
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
