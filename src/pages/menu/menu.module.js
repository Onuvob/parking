var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IonicPageModule } from 'ionic-angular';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from './menu';
import { UserprofilePage } from '../userprofile/userprofile';
import { ParkinglotsPage } from '../parkinglots/parkinglots';
import { AddgaragePage } from '../addgarage/addgarage';
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        NgModule({
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
    ], MenuPageModule);
    return MenuPageModule;
}());
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map