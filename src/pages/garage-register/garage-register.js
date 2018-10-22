var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
var GarageRegisterPage = /** @class */ (function () {
    function GarageRegisterPage(navCtrl, formBuilder, navParams, networkConnector) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.networkConnector = networkConnector;
        //valdators for user registration purposes
        this.registration = this.formBuilder.group({
            garageTitle: [''],
            garageAddress: [''],
            monthlyRent: [''],
            hourlyRent: ['']
        });
    }
    GarageRegisterPage.prototype.ionViewDidLoad = function () {
        //console.log(this.navParams.get('lat'));
        console.log('ionViewDidLoad GarageRegisterPage');
    };
    GarageRegisterPage.prototype.garageReg = function (garageTitle, garageAddress, hourlyRent, monthlyRent) {
        var _this = this;
        this.networkConnector.garageRegister(garageTitle, garageAddress, hourlyRent, monthlyRent, this.navParams.get('lat'), this.navParams.get('lng')).then(function (data) {
            //console.log("I recieved: " + JSON.stringify(data));
            console.log("in 1");
            if (data.foo == true) {
                console.log(data.foo);
                _this.navCtrl.setRoot(MenuPage);
            }
            else {
                console.log("in 3");
                console.log("eoror");
            }
        });
        console.log("I am in garage reg");
    };
    GarageRegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-garage-register',
            templateUrl: 'garage-register.html',
        }),
        __metadata("design:paramtypes", [NavController,
            FormBuilder,
            NavParams,
            NetworkEngineProvider])
    ], GarageRegisterPage);
    return GarageRegisterPage;
}());
export { GarageRegisterPage };
//# sourceMappingURL=garage-register.js.map