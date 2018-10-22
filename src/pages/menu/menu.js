var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ParkinglotsPage } from '../parkinglots/parkinglots';
import { UserprofilePage } from '../userprofile/userprofile';
import { AddgaragePage } from '../addgarage/addgarage';
import { MygaragePage } from '../mygarage/mygarage';
import { CurrentProcessPage } from '../current-process/current-process';
import { TermsPage } from '../terms/terms';
import { GetUserProvider } from '../../providers/get-user/get-user';
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, platform, statusBar, splashScreen, currUser) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.currUser = currUser;
        this.rootPage = ParkinglotsPage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Find', component: ParkinglotsPage },
            { title: 'Add Garage', component: AddgaragePage },
            { title: 'My Account', component: UserprofilePage },
            { title: 'My Garages', component: MygaragePage },
            { title: 'Current Process', component: CurrentProcessPage },
            { title: 'Terms', component: TermsPage }
        ];
    }
    MenuPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MenuPage');
        //sending current user to get user provider
        this.currUser.setCurrUser(this.navParams.get('currentUser'));
    };
    MenuPage.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MenuPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Platform,
            StatusBar,
            SplashScreen,
            GetUserProvider])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map