import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Countries, DataCountries } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
	selector: 'app-countries',
	templateUrl: './countries.component.html',
	styleUrls: ['./countries.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CountriesComponent implements OnInit, OnDestroy {
	@Output() rowSelected : EventEmitter<any> = new EventEmitter();
	countries: DataCountries[] = [];

	displayedColumns: string[] = [
		'indicator',
		'date',
		'country',
		'countryiso3code',
	];
	dataSource = new MatTableDataSource<DataCountries>();
	subscription = new Subscription();

	@ViewChild(MatPaginator)
	paginator!: MatPaginator;

	ngAfterViewInit() {
	   this.getData();
	}

	constructor(private countriesService: CountriesService) {}

	ngOnInit(): void {
	  this.getData();
	}

	getData() {
		this.subscription = this.countriesService.countries.subscribe(
		(countries) => {
			this.countries = countries;
			(this.countries ) ? this.dataSource.data = this.countries : this.dataSource.data = [];
			this.dataSource.paginator = this.paginator;
		}
	);
	}

	selectedRow(row:DataCountries) {
		console.log(row);
	   this.rowSelected.emit(row);
	}
   
	setIndicators(indicator: DataCountries[]) {
		this.countriesService.setListCountries(indicator);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
