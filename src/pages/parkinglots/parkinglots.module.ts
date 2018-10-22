import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkinglotsPage } from './parkinglots';

@NgModule({
  declarations: [
    ParkinglotsPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkinglotsPage),
  ],
})
export class ParkinglotsPageModule {}
