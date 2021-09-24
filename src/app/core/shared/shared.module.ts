import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { HeaderComponent } from './header/header.component';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule],
	exports: [AppMaterialModule, HeaderComponent],
})
export class SharedModule {}
