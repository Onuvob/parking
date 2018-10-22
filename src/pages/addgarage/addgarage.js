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
import { Geolocation } from '@ionic-native/geolocation';
import { GarageRegisterPage } from '../garage-register/garage-register';
import { Observable } from 'rxjs/Observable';
var AddgaragePage = /** @class */ (function () {
    function AddgaragePage(platform, loadingCtrl, navCtrl, navParams, geo, alertCtrl, ngZone) {
        var _this = this;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geo = geo;
        this.alertCtrl = alertCtrl;
        this.ngZone = ngZone;
        this.addressElement = null;
        console.log("Add Garage Page");
        this.platform.ready().then(function () { return _this.loadMaps(); });
    }
    AddgaragePage.prototype.loadMaps = function () {
        if (!!google) {
            this.initializeMap();
            this.initAutocomplete();
        }
        else {
            this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.');
        }
    };
    AddgaragePage.prototype.errorAlert = function (title, message) {
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
    AddgaragePage.prototype.initAutocomplete = function () {
        var _this = this;
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (searchedLocation) {
            //console.log('Searchdata', searchedLocation);
            var options = {
                center: searchedLocation,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
                disableDoubleClickZoom: false,
                disableDefaultUI: true,
                zoomControl: false,
                scaleControl: true
            };
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, options);
            _this.selectedPlaceGeo = false;
            //console.log(this.selectedPlace.name);
            _this.addMarker(searchedLocation);
        });
    };
    AddgaragePage.prototype.createAutocomplete = function (addressEl) {
        var _this = this;
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        this.map = new google.maps.Map(this.mapRef.nativeElement);
        autocomplete.bindTo('bounds', this.map);
        return new Observable(function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                _this.selectedPlace = place;
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    //console.log('Search Lat', place.geometry.location.lat());
                    //console.log('Search Lng', place.geometry.location.lng());
                    sub.next(place.geometry.location);
                    //sub.complete();
                }
            });
        });
    };
    AddgaragePage.prototype.initializeMap = function () {
        var _this = this;
        var currLocation;
        this.loading = this.loadingCtrl.create({
            content: 'Searching Location ...'
        });
        this.loading.present();
        var locationOptions = {
            timeout: 5000,
            enableHighAccuracy: true
        };
        this.geo.getCurrentPosition(locationOptions).then(function (position) {
            _this.loading.dismiss().then(function () {
                currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                _this.mapOptions =
                    {
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
                _this.map = new google.maps.Map(_this.mapRef.nativeElement, _this.mapOptions);
                _this.selectedPlaceGeo = true;
                _this.addMarker(currLocation);
            });
        }, function (err) {
        });
    };
    AddgaragePage.prototype.addMarker = function (position) {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: position,
            draggable: true,
        });
        var that = this;
        //console.log(position.lat());
        //console.log(position.lng());
        var content = document.createElement('div'), button;
        content.innerHTML = 'Would you like to select this location?<br/>';
        button = content.appendChild(document.createElement('input'));
        button.type = 'button';
        button.value = 'Select';
        that.addInfoWindow(marker, content);
        var gotPlace;
        /*google.maps.event.addListener(marker, 'dragend', function(evt)
        {
            that.selectedPlaceGeo = false;
            console.log("when false first");
            console.log(that.selectedPlaceGeo);
            return;
        });

        console.log("I am out");
        console.log(that.selectedPlaceGeo);*/
        if (that.selectedPlaceGeo) {
            //console.log("when true");
            //console.log(that.selectedPlaceGeo);
            gotPlace =
                {
                    lat: position.lat(),
                    lng: position.lng()
                };
            //if the marker is replaced then the value of current position will change
            google.maps.event.addListener(marker, 'dragend', function (evt) {
                gotPlace =
                    {
                        lat: evt.latLng.lat(),
                        lng: evt.latLng.lng()
                    };
            });
            google.maps.event.addDomListener(button, 'click', function () {
                //passing searched latitude & longitude value
                that.navCtrl.push(GarageRegisterPage, gotPlace);
            });
        }
        else {
            google.maps.event.addListener(marker, 'dragend', function (evt) {
                //console.log(that.selectedPlace.geometry.location.lat());
                //console.log(that.selectedPlace);
                gotPlace =
                    {
                        lat: evt.latLng.lat(),
                        lng: evt.latLng.lng()
                    };
            });
            //console.log("when false second");
            google.maps.event.addDomListener(button, 'click', function () {
                //passing searched latitude & longitude value
                that.navCtrl.push(GarageRegisterPage, gotPlace);
            });
            //this.addInfoWindow(marker, evt.latLng.lat());
            //Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
        }
    };
    AddgaragePage.prototype.addInfoWindow = function (marker, content) {
        var infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(content);
            infoWindow.open(this.map, this);
        });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], AddgaragePage.prototype, "mapRef", void 0);
    __decorate([
        ViewChild('searchbar', { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], AddgaragePage.prototype, "searchbar", void 0);
    AddgaragePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-addgarage',
            templateUrl: 'addgarage.html',
        }),
        __metadata("design:paramtypes", [Platform,
            LoadingController,
            NavController,
            NavParams,
            Geolocation,
            AlertController,
            NgZone])
    ], AddgaragePage);
    return AddgaragePage;
}());
export { AddgaragePage };
//# sourceMappingURL=addgarage.js.map