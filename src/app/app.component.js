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
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { NetworkEngineProvider } from '../providers/network-engine/network-engine';
var MyApp = /** @class */ (function () {
    function MyApp(statusBar, splashScreen, platform, events, network, networkProvider) {
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.platform = platform;
        this.events = events;
        this.network = network;
        this.networkProvider = networkProvider;
        this.rootPage = LoginPage;
        this.initializeApp();
    }
    //to check the internet online or offline
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        console.log("I am here before platform ready in App component");
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            console.log("I am here after platform ready in App component");
            _this.networkProvider.initializeNetworkEvents();
            // Offline event
            _this.events.subscribe('network:offline', function () {
                console.log("I am here after platform ready in Network offline");
                alert('network:offline ==> ' + _this.network.type);
            });
            // Online event
            _this.events.subscribe('network:online', function () {
                console.log("I am here after platform ready in Network online");
                alert('network:online ==> ' + _this.network.type);
            });
        });
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [StatusBar,
            SplashScreen,
            Platform,
            Events,
            Network,
            NetworkEngineProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map