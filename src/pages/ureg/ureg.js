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
import { Validators, FormBuilder } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
var UregPage = /** @class */ (function () {
    function UregPage(navCtrl, navParams, formBuilder, networkConnector) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.networkConnector = networkConnector;
        //valdators for user registration purposes
        this.registration = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
            //email: ['', Validators.compose([Validators.required, Validators.pattern(".+\@.+\..+")])],
            password: ['', Validators.required],
            contact: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')])],
            address: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])]
        });
    }
    UregPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UregPage');
    };
    /* pick images from gallery */
    //code haven't ready yet
    /* open menu page */
    UregPage.prototype.openMenuPage = function () {
        this.navCtrl.setRoot(MenuPage);
    };
    UregPage.prototype.userReg = function (userName, userPassword, userNumber, userAddress) {
        var _this = this;
        this.networkConnector.userReg(userName, userPassword, userNumber, userAddress).then(function (data) {
            //console.log("I recieved: " + JSON.stringify(data));
            console.log("in 1");
            if (data.foo == true) {
                console.log(data.foo);
                _this.openMenuPage();
            }
            else {
                console.log("in 3");
                console.log("eoror");
            }
        });
    };
    UregPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ureg',
            templateUrl: 'ureg.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            NetworkEngineProvider])
    ], UregPage);
    return UregPage;
}());
export { UregPage };
//# sourceMappingURL=ureg.js.map