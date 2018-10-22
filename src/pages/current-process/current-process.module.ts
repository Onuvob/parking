import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentProcessPage } from './current-process';

@NgModule({
  declarations: [
    CurrentProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentProcessPage),
  ],
})
export class CurrentProcessPageModule {}
