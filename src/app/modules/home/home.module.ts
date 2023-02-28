import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-routing.module';
import { PusherService } from 'src/app/shared/pusher/pusher.service';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage
  ],
  providers: [
    PusherService,
    HttpClient
  ]
})
export class HomePageModule { }
