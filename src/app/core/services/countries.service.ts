import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Countries, Region } from '../models/countries.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiURL = 'http://api.worldbank.org/v2/';
  
  constructor(private http:HttpClient) { }

 // Http Options
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
 }  

 getcountries(): Observable<Countries> {
  return this.http.get<Countries>(this.apiURL + 'country/AFE/indicator/AG.AGR.TRAC.NO;SP.POP.TOTL?source=2&format=json')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

getRegions() {
  return this.http.get<Region>(this.apiURL + 'region?format=json')
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
