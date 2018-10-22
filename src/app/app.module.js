var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { UregPage } from '../pages/ureg/ureg';
import { MenuPage } from '../pages/menu/menu';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { ParkinglotsPage } from '../pages/parkinglots/parkinglots';
import { AddgaragePage } from '../pages/addgarage/addgarage';
import { GarageRegisterPage } from '../pages/garage-register/garage-register';
import { MygaragePage } from '../pages/mygarage/mygarage';
import { CurrentProcessPage } from '../pages/current-process/current-process';
import { TermsPage } from '../pages/terms/terms';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { MyGarageInfoPage } from '../pages/my-garage-info/my-garage-info';
import { LocationsProvider } from '../providers/locations/locations';
import { NetworkEngineProvider } from '../providers/network-engine/network-engine';
import { Network } from '@ionic-native/network';
import { GetUserProvider } from '../providers/get-user/get-user';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                LoginPage,
                UregPage,
                MenuPage,
                UserprofilePage,
                ParkinglotsPage,
                AddgaragePage,
                GarageRegisterPage,
                MygaragePage,
                MyGarageInfoPage,
                CurrentProcessPage,
                TermsPage,
                PersonalInfoPage
            ],
            imports: [
                BrowserModule,
                IonicModule.forRoot(MyApp),
                HttpModule,
                HttpClientModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                LoginPage,
                UregPage,
                MenuPage,
                UserprofilePage,
                ParkinglotsPage,
                AddgaragePage,
                GarageRegisterPage,
                MygaragePage,
                MyGarageInfoPage,
                CurrentProcessPage,
                TermsPage,
                PersonalInfoPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                HeaderColor,
                Geolocation,
                LocationsProvider,
                NetworkEngineProvider,
                Network,
                GetUserProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map