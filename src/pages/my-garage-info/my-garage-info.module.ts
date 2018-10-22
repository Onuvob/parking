import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyGarageInfoPage } from './my-garage-info';

@NgModule({
  declarations: [
    MyGarageInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MyGarageInfoPage),
  ],
})
export class MyGarageInfoPageModule {}
