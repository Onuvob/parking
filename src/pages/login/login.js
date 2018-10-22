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
import { Events, IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { UregPage } from '../ureg/ureg';
import { MenuPage } from '../menu/menu';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, formBuilder, alertCtrl, networkConnector, events, toastCtrl, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.networkConnector = networkConnector;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.splash = true; //apploading default splash icon true
        //validators for login page's fields
        this.login = this.formBuilder.group({
            //email: ['', Validators.compose([Validators.required, Validators.pattern(".+\@.+\..+")])]
            contact: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')])],
            password: ['', Validators.required]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        //time out method for apploading splash screen
        // setTimeout(() =>{
        //   this.splash = false;
        // }, 4000)
    };
    //open registration page for new users
    LoginPage.prototype.openUregPage = function () {
        this.navCtrl.push(UregPage);
    };
    //open menu page after succesfull login
    LoginPage.prototype.openMenuPage = function (userNumber) {
        var user = {
            currentUser: userNumber
        };
        this.navCtrl.setRoot(MenuPage, user);
    };
    LoginPage.prototype.findUser = function (userNumber, userPassword) {
        var _this = this;
        this.networkConnector.checkUser(userNumber, userPassword).then(function (data) {
            console.log("I recieved: " + JSON.stringify(data));
            //console.log("in 1");
            if (data.foo == true) {
                console.log("login successful");
                _this.openMenuPage(userNumber);
            }
            else {
                //console.log("in 3");
                //console.log("eoror");
                _this.errorAlert('Unsuccessful login!', "User number and password doesn't match");
                var toast_1;
                _this.network.onDisconnect().subscribe(function () {
                    console.log("oN CHECK NET");
                    toast_1 = _this.toastCtrl.create({
                        message: 'Error in login. Try again!',
                        position: 'top',
                        duration: 2000,
                        cssClass: 'failure'
                    });
                    toast_1.present();
                });
            }
        }).catch(function (err) {
            console.log("login unsuccessful");
            _this.errorAlert('Error!', 'Something went wrong with the Internet Connection. Please check your Internet.');
        });
    };
    LoginPage.prototype.errorAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            FormBuilder,
            AlertController,
            NetworkEngineProvider,
            Events,
            ToastController,
            Network])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map