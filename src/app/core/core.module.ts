import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { IndicatorsGraphComponent } from './components/indicators-graph/indicators-graph.component';
import { SharedModule } from './shared/shared.module';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CountriesComponent } from './components/countries/countries.component';

@NgModule({
	declarations: [
		DashboardComponent,
		CountriesComponent,
		IndicatorsComponent,
		IndicatorsGraphComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	exports: [
		DashboardComponent,
		CountriesComponent,
		IndicatorsComponent,
		IndicatorsGraphComponent,
	],
	providers: [HttpClientModule],
})
export class CoreModule {}
