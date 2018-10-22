import { IonicPageModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from './menu';
import { UserprofilePage } from '../userprofile/userprofile';
import { ParkinglotsPage } from '../parkinglots/parkinglots';
import { AddgaragePage } from '../addgarage/addgarage';


@NgModule(
{
    declarations: [
      MenuPage,
      UserprofilePage,
      ParkinglotsPage,
      AddgaragePage
    ],
    imports: [
      IonicPageModule.forChild(MenuPage),
    ],
    entryComponents: [
      MenuPage,
      UserprofilePage,
      ParkinglotsPage,
      AddgaragePage
    ],
    providers: [
      StatusBar,
      SplashScreen,
      { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class MenuPageModule {}
