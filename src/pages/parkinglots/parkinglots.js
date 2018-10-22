var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsProvider } from '../../providers/locations/locations';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { Observable } from 'rxjs/Observable';
var ParkinglotsPage = /** @class */ (function () {
    function ParkinglotsPage(platform, loadingCtrl, navCtrl, navParams, geo, alertCtrl, ngZone, storedLocation, networkConnector, toastCtrl, network) {
        /*let noInternetToast: Toast;
        let onlineToast: Toast;

        console.log("oN CHECK NET 1");
        this.network.onDisconnect().subscribe(() =>
        {
            console.log("oN CHECK NET");
            noInternetToast = this.toastCtrl.create(
            {
                message: 'No Internet Connection',
                position: 'top',
                duration: 2000,
                cssClass: 'failure'
            });

            noInternetToast.present();
        });

        this.network.onConnect().subscribe(() =>
        {
            // TODO: figure out way to reload current view
            console.log("on success");
            onlineToast = this.toastCtrl.create(
            {
                message: 'Back online',
                position: 'top',
                duration: 2000,
                cssClass: 'success'
            });

            noInternetToast.dismiss();
            onlineToast.present();
        }); */
        var _this = this;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geo = geo;
        this.alertCtrl = alertCtrl;
        this.ngZone = ngZone;
        this.storedLocation = storedLocation;
        this.networkConnector = networkConnector;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.addressElement = null;
        this.markers = [];
        console.log("Parking Lots Page");
        this.platform.ready().then(function () { return _this.loadMaps(); });
    }
    ParkinglotsPage.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
            this.initAutocomplete();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    ParkinglotsPage.prototype.errorAlert = function (title, message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.loadMaps();
                    }
                }
            ]
        });
        alert.present();
    };
    //search bar autocomplete places function
    ParkinglotsPage.prototype.initAutocomplete = function () {
        var _this = this;
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (searchedLocation) {
            var mapOptions = {
                center: searchedLocation,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
                disableDoubleClickZoom: false,
                disableDefaultUI: true,
                zoomControl: false,
                scaleControl: true
            };
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, mapOptions);
            //this.addMarker(searchedLocation, "Get Located");
            var loading = _this.loadingCtrl.create({
                content: 'Searching Places ...'
            });
            loading.present();
            loading.dismiss().then(function () {
                var searchedLocation = new google.maps.LatLng(_this.selectedLatLng.geometry.location.lat(), _this.selectedLatLng.geometry.location.lng());
                _this.addGeoMarker(searchedLocation, _this.selectedLatLng.name);
                var locationLoaded = _this.networkConnector.getlocations();
                Promise.all([
                    _this.map,
                    locationLoaded
                ]).then(function (result) {
                    var locationed;
                    locationed = result[1];
                    for (var _i = 0, locationed_1 = locationed; _i < locationed_1.length; _i++) {
                        var location_1 = locationed_1[_i];
                        console.log(location_1);
                        //console.log(location.lat);
                        //console.log(location.title);
                        _this.addMarker(location_1);
                    }
                });
                /*let locationLoaded = this.storedLocation.load(this.selectedLatLng);

                let searchedLocation = new google.maps.LatLng(this.selectedLatLng.geometry.location.lat(), this.selectedLatLng.geometry.location.lng());
                            
                this.addGeoMarker(searchedLocation, this.selectedLatLng.name, this.map);
                
                Promise.all([
                    this.map,
                    locationLoaded
                ]).then((result) => {

                    let locations = result[1];

                    for (let location of locations)
                    {
                        //console.log(location.latitude);
                        //console.log(location.title);
                        this.addMarker(location);
                    }

                });*/
            });
        });
    };
    ParkinglotsPage.prototype.createAutocomplete = function (addressEl) {
        var _this = this;
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        this.map = new google.maps.Map(this.mapRef.nativeElement);
        autocomplete.bindTo('bounds', this.map);
        return new Observable(function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                _this.selectedLatLng = place;
                //console.log(place.name);
                //console.log(place.geometry.location.lat());
                //console.log(place.geometry.location.lng());
                //this.selectedLat = place.geometry.location.lat();
                //this.selectedLng = place.geometry.location.lng();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    //console.log('Search Lat', place.geometry.location.lat());
                    sub.next(place.geometry.location);
                    //sub.complete();
                }
            });
        });
    };
    ParkinglotsPage.prototype.initializeMap = function () {
        var _this = this;
        var currLocation;
        var loading = this.loadingCtrl.create({
            content: 'Searching Location ...'
        });
        loading.present();
        loading.dismiss();
        var locationOptions = {
            timeout: 5000,
            enableHighAccuracy: true
        };
        this.geo.getCurrentPosition(locationOptions).then(function (position) {
            currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: currLocation,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
                disableDoubleClickZoom: false,
                disableDefaultUI: true,
                zoomControl: false,
                scaleControl: true
            };
            //center: { lat: -33.8688, lng: 151.2195 },
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, mapOptions);
            _this.addGeoMarker(currLocation, "Me");
            //console.log(location);	
        }, function (err) {
        });
    };
    ParkinglotsPage.prototype.addMarker = function (location) {
        var _this = this;
        this.fromSearchedParking = true;
        var latLng = new google.maps.LatLng(location.lat, location.lon);
        //console.log(location.lat);
        //console.log(location.title);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        var content = document.createElement('div'), button1, button2;
        content.innerHTML = '<b>Title:</b> ' +
            location.title +
            '<br>' +
            '<b>Hourly rent:</b> ' +
            location.hourly_rent +
            'Tk.<br>' +
            '<b>Monthly rent:</b> ' +
            location.monthly_rent +
            'Tk.<br>';
        button1 = content.appendChild(document.createElement('input'));
        button1.type = 'button';
        button1.value = 'Request';
        button2 = content.appendChild(document.createElement('input'));
        button2.type = 'button';
        button2.value = 'View details';
        google.maps.event.addDomListener(button1, 'click', function () {
            //passing searched latitude & longitude value
            console.log("Requst has been sent");
            _this.presentConfirm();
        });
        google.maps.event.addDomListener(button2, 'click', function () {
            //passing searched latitude & longitude value
            console.log("Button two clicked");
            var gotPlace;
            console.log(location);
            _this.navCtrl.push(PersonalInfoPage, location);
            //that.navCtrl.push(GarageRegisterPage, gotPlace);
        });
        this.markers.push(marker);
        this.addInfoWindow(marker, content);
    };
    ParkinglotsPage.prototype.addInfoWindow = function (marker, content) {
        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(content);
            infoWindow.open(this.map, this);
        });
    };
    ParkinglotsPage.prototype.addGeoMarker = function (position, content) {
        this.fromSearchedParking = false;
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: position
        });
        this.addInfoWindow(marker, content);
    };
    ParkinglotsPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Request',
            message: 'Do you want to send request?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function () {
                        console.log('Buy clicked');
                        _this.presentToast();
                    }
                }
            ]
        });
        alert.present();
    };
    ParkinglotsPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Request has sent to provider!',
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], ParkinglotsPage.prototype, "mapRef", void 0);
    __decorate([
        ViewChild('searchbar', { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], ParkinglotsPage.prototype, "searchbar", void 0);
    ParkinglotsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-parkinglots',
            templateUrl: 'parkinglots.html',
        }),
        __metadata("design:paramtypes", [Platform,
            LoadingController,
            NavController,
            NavParams,
            Geolocation,
            AlertController,
            NgZone,
            LocationsProvider,
            NetworkEngineProvider,
            ToastController,
            Network])
    ], ParkinglotsPage);
    return ParkinglotsPage;
}());
export { ParkinglotsPage };
//# sourceMappingURL=parkinglots.js.map