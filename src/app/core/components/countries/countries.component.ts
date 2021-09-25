import {
	Component,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
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
		this.dataSource.paginator = this.paginator;
		console.log(this.countries);
	}

	constructor(private countriesService: CountriesService) {}

	ngOnInit(): void {
		this.subscription = this.countriesService.countries.subscribe(
			(countries) => {
				this.countries = countries;
			   (this.countries ) ? this.dataSource.data = this.countries : this.dataSource.data = [];
			   	this.dataSource.paginator = this.paginator;
			}
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
