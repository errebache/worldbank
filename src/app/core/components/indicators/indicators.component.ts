import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DataCountries, Indicator } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'country', 'indicator', 'value'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @Input() indicators: DataCountries[]=[];
	dataSource = new MatTableDataSource<DataCountries>();
	subscription = new Subscription();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.getAllIndicators();
  }


  getAllIndicators() {
    console.log(this.indicators);
    this.subscription = this.countriesService.indicators.subscribe(
      (indicators) => {
        this.indicators = indicators;
        (this.indicators ) ? this.dataSource.data = this.indicators : this.dataSource.data = [];
        this.dataSource.paginator = this.paginator;
        console.log(this.indicators)
      }
    );

  }


  ngOnDestroy() {
		this.subscription.unsubscribe();
	}


}



