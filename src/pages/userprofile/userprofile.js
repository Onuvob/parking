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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { GetUserProvider } from '../../providers/get-user/get-user';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
var UserprofilePage = /** @class */ (function () {
    function UserprofilePage(alertCtrl, navCtrl, navParams, formBuilder, currUser, network) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.currUser = currUser;
        this.network = network;
    }
    UserprofilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserprofilePage');
        this.getUser();
    };
    UserprofilePage.prototype.getUser = function () {
        var _this = this;
        var user = this.network.getUserInfo(this.currUser.getCurrUser());
        console.log('After called getUser');
        //console.log(user);
        //here below is not working. just need to break the promise object for user info
        Promise.all([
            user
        ]).then(function (cUser) {
            console.log('At user profile');
            var currUser;
            currUser = cUser[0][0];
            //console.log(currUser);
            console.log(currUser.name);
            _this.name = currUser.name;
            _this.contact = currUser.contact;
            _this.password = currUser.password;
        }).catch(function (err) {
            _this.errorAlert('Error!', 'Something went wrong with the Internet Connection. Please check your Internet.');
        });
    };
    UserprofilePage.prototype.errorAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    UserprofilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-userprofile',
            templateUrl: 'userprofile.html',
        }),
        __metadata("design:paramtypes", [AlertController,
            NavController,
            NavParams,
            FormBuilder,
            GetUserProvider,
            NetworkEngineProvider])
    ], UserprofilePage);
    return UserprofilePage;
}());
export { UserprofilePage };
//# sourceMappingURL=userprofile.js.map