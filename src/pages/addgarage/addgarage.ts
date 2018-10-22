import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { GarageRegisterPage } from '../garage-register/garage-register';

import { Observable } from 'rxjs/Observable';

declare var google: any;

@IonicPage()
@Component({
	selector: 'page-addgarage',
	templateUrl: 'addgarage.html',
})
export class AddgaragePage
{

	@ViewChild('map') mapRef: ElementRef;
	@ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
	addressElement: HTMLInputElement = null;

	map: any;
	mapOptions: any;
	loading: any;
	selectedPlace: any;
	selectedPlaceGeo: boolean;

	constructor(
		public platform: Platform,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public geo: Geolocation,
		public alertCtrl: AlertController,
		public ngZone: NgZone
		)
	{
		console.log("Add Garage Page");
		this.platform.ready().then(() => this.loadMaps());
	}

	loadMaps()
	{
		if (!!google)
		{
			this.initializeMap();
			this.initAutocomplete();
		}
		else
		{
			this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
		}
	}

	errorAlert(title, message)
	{
		let alert = this.alertCtrl.create(
		{
			title: title,
			message: message,
			buttons:
			[
			{
				text: 'OK',
				handler: data =>
				{
					this.loadMaps();
				}
			}
			]
		});
		alert.present();
	}
	initAutocomplete()
	{

		this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
		this.createAutocomplete(this.addressElement).subscribe((searchedLocation) =>
		{
			 //console.log('Searchdata', searchedLocation);
			let options =
			{
			 	center: searchedLocation,
			 	zoom: 15,
			 	mapTypeId: google.maps.MapTypeId.ROADMAP,
			 	styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
			 	disableDoubleClickZoom: false,
			 	disableDefaultUI: true,
			 	zoomControl: false,
			 	scaleControl: true
			};

			this.map = new google.maps.Map(this.mapRef.nativeElement, options);

			this.selectedPlaceGeo = false;
			//console.log(this.selectedPlace.name);
			this.addMarker(searchedLocation);
		});
	}

	createAutocomplete(addressEl: HTMLInputElement)
	{
		const autocomplete = new google.maps.places.Autocomplete(addressEl);

		this.map = new google.maps.Map(this.mapRef.nativeElement);
		
		autocomplete.bindTo('bounds', this.map);

		return new Observable((sub: any) =>
		{
			google.maps.event.addListener(autocomplete, 'place_changed', () =>
			{
				const place = autocomplete.getPlace();
				this.selectedPlace = place;

				if (!place.geometry)
				{
					sub.error(
					{
						message: 'Autocomplete returned place with no geometry'
					});
				}
				else
				{
					//console.log('Search Lat', place.geometry.location.lat());
					//console.log('Search Lng', place.geometry.location.lng());
					sub.next(place.geometry.location);
					//sub.complete();
				}
			});
		});
	}
	initializeMap()
	{
		let currLocation;

		this.loading = this.loadingCtrl.create(
		{
			content: 'Searching Location ...'
		});

		this.loading.present();

		let locationOptions =
		{
			timeout: 5000,
			enableHighAccuracy: true
		};

		this.geo.getCurrentPosition(locationOptions).then((position) =>
		{
			this.loading.dismiss().then(() => 
			{
				currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				this.mapOptions =
				{
					center: currLocation,
					zoom: 15,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
					disableDoubleClickZoom: false,
					disableDefaultUI: true,
					zoomControl: false,
					scaleControl: true
				}
				//center: { lat: -33.8688, lng: 151.2195 },
				this.map = new google.maps.Map(this.mapRef.nativeElement, this.mapOptions);

				this.selectedPlaceGeo = true;

				this.addMarker(currLocation);
			});

		}, (err) =>
		{
		});
	}

	addMarker(position)
	{
		let marker = new google.maps.Marker(
		{
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: position,
			draggable: true,
		});

		let that = this;

		//console.log(position.lat());
		//console.log(position.lng());
		
		var content = document.createElement('div'), button;
		content.innerHTML = 'Would you like to select this location?<br/>';
		button = content.appendChild(document.createElement('input'));
		button.type = 'button';
		button.value = 'Select';

		that.addInfoWindow(marker, content);

		let gotPlace;

		/*google.maps.event.addListener(marker, 'dragend', function(evt)
		{
			that.selectedPlaceGeo = false;
			console.log("when false first");
			console.log(that.selectedPlaceGeo);
			return;
		});

		console.log("I am out");
		console.log(that.selectedPlaceGeo);*/

		if(that.selectedPlaceGeo)
		{
			//console.log("when true");
			//console.log(that.selectedPlaceGeo);
			gotPlace =
			{
				lat: position.lat(),
				lng: position.lng()
			}

			//if the marker is replaced then the value of current position will change
			google.maps.event.addListener(marker, 'dragend', function(evt)
			{
				gotPlace =
				{
					lat: evt.latLng.lat(),
					lng: evt.latLng.lng()
				}
			});

			google.maps.event.addDomListener(button, 'click', () =>
			{
				//passing searched latitude & longitude value
				that.navCtrl.push(GarageRegisterPage, gotPlace);
			});
		}

		else
		{
			google.maps.event.addListener(marker, 'dragend', function(evt)
			{
				//console.log(that.selectedPlace.geometry.location.lat());
				//console.log(that.selectedPlace);
				gotPlace =
				{
					lat: evt.latLng.lat(),
					lng: evt.latLng.lng()
				}
			});
			//console.log("when false second");
			google.maps.event.addDomListener(button, 'click', () =>
			{
				//passing searched latitude & longitude value
				that.navCtrl.push(GarageRegisterPage, gotPlace);
			});
			//this.addInfoWindow(marker, evt.latLng.lat());
			//Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
		}
	}

	addInfoWindow(marker, content)
	{
		let infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker, 'click', function()
		{
			infoWindow.setContent(content);
			infoWindow.open(this.map, this);
		});
	}
}









