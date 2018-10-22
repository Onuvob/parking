import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MygaragePage } from './mygarage';

@NgModule({
  declarations: [
    MygaragePage,
  ],
  imports: [
    IonicPageModule.forChild(MygaragePage),
  ],
})
export class MygaragePageModule {}
