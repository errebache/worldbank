import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[
    AppMaterialModule,
    HeaderComponent
  ]
})
export class SharedModule { }
