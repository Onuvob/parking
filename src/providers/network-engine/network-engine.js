var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
export var ConnectionStatusEnum;
(function (ConnectionStatusEnum) {
    ConnectionStatusEnum[ConnectionStatusEnum["Online"] = 0] = "Online";
    ConnectionStatusEnum[ConnectionStatusEnum["Offline"] = 1] = "Offline";
})(ConnectionStatusEnum || (ConnectionStatusEnum = {}));
var NetworkEngineProvider = /** @class */ (function () {
    function NetworkEngineProvider(http, alertCtrl, network, eventCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.eventCtrl = eventCtrl;
        console.log('Hello NetworkEngineProvider Provider');
        this.previousStatus = ConnectionStatusEnum.Online;
    }
    //check whether user is availabe or not
    NetworkEngineProvider.prototype.checkUser = function (userNumber, userPassword) {
        var url = "http://127.0.0.1/parking/userlogin.php";
        var param = { userNumber: userNumber, userPassword: userPassword };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    //get all info of user
    NetworkEngineProvider.prototype.getUserInfo = function (userNumber) {
        var url = "http://127.0.0.1/parking/getuserinfo.php";
        var param = { userNumber: userNumber };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    //registering new user
    NetworkEngineProvider.prototype.userReg = function (userName, userPassword, userNumber, userAddress, oneSignalID) {
        var url = "http://127.0.0.1/parking/createuser.php";
        var param = { userName: userName, userNumber: userNumber, userPassword: userPassword, userAddress: userAddress, oneSignalID: oneSignalID };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    NetworkEngineProvider.prototype.garageRegister = function (garageTitle, garageAddress, hourlyRent, monthlyRent, lat, lng) {
        var url = "http://127.0.0.1/parking/addgarage.php";
        var param = { garageTitle: garageTitle, garageAddress: garageAddress, hourlyRent: hourlyRent, monthlyRent: monthlyRent, lat: lat, lng: lng };
        var request = this.http.post(url, param);
        return request.toPromise();
    };
    NetworkEngineProvider.prototype.getlocations = function () {
        var url = "http://127.0.0.1/parking/getlocations.php";
        //let param = { garageTitle: garageTitle, garageAddress: garageAddress, hourlyRent: hourlyRent, monthlyRent: monthlyRent };
        var request = this.http.get(url);
        return request.toPromise();
    };
    //to check the internet
    NetworkEngineProvider.prototype.initializeNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            if (_this.previousStatus === ConnectionStatusEnum.Online) {
                _this.eventCtrl.publish('network:offline');
            }
            _this.previousStatus = ConnectionStatusEnum.Offline;
        });
        setTimeout(function () {
            if (_this.previousStatus === ConnectionStatusEnum.Offline) {
                _this.eventCtrl.publish('network:online');
            }
            _this.previousStatus = ConnectionStatusEnum.Online;
        }, 3000);
    };
    NetworkEngineProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            AlertController,
            Network,
            Events])
    ], NetworkEngineProvider);
    return NetworkEngineProvider;
}());
export { NetworkEngineProvider };
//# sourceMappingURL=network-engine.js.map