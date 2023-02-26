import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-routing.module';
import { PusherProvider } from 'src/providers/pusher/pusher';
import { ChartComponent } from '../chart/chart.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ChartComponent
  ],
  providers: [
    PusherProvider,
    HttpClient
  ]
})
export class HomePageModule { }
