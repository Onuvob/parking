import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GarageRegisterPage } from './garage-register';

@NgModule({
  declarations: [
    GarageRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(GarageRegisterPage),
  ],
})
export class GarageRegisterPageModule {}
