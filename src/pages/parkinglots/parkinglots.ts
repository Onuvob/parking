import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ToastController, Toast } from 'ionic-angular';

import { PersonalInfoPage } from '../personal-info/personal-info';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsProvider } from '../../providers/locations/locations';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';

import { Observable } from 'rxjs/Observable';

declare var google: any;

@IonicPage()
@Component({
	selector: 'page-parkinglots',
	templateUrl: 'parkinglots.html',
})

export class ParkinglotsPage
{

	@ViewChild('map') mapRef: ElementRef;
	@ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
	addressElement: HTMLInputElement = null;

	selectedLatLng: any;
	markers: any = [];
	map: any;
	fromSearchedParking: boolean;
	status: string;

	constructor(
		public platform: Platform,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public ngZone: NgZone,
		public storedLocation: LocationsProvider,
		public networkConnector: NetworkEngineProvider,
		private toastCtrl: ToastController,
		private network: Network,
		private geo: Geolocation)
	{
		
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

		console.log("Parking Lots Page");
		this.platform.ready().then(() => this.loadMaps());
	}

	loadMaps()
	{
		console.log("In load map function");
		if (!!google)
		{
			console.log("In load map function if condition");
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

	//search bar autocomplete places function
	initAutocomplete()
	{
		this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');

		this.createAutocomplete(this.addressElement).subscribe((searchedLocation) =>
		{
			let mapOptions =
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
			
			this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
			//this.addMarker(searchedLocation, "Get Located");
			
			let loading = this.loadingCtrl.create(
			{
				content: 'Searching Places ...'
			});

			loading.present();

			loading.dismiss().then(() =>
			{
				let searchedLocation = new google.maps.LatLng(this.selectedLatLng.geometry.location.lat(), this.selectedLatLng.geometry.location.lng());

				this.addGeoMarker(searchedLocation, this.selectedLatLng.name);

				let locationLoaded = this.networkConnector.getlocations();

				Promise.all([
					this.map,
					locationLoaded
				]).then((result) =>
				{
					let locationed;
					locationed = result[1];

					for (let location of locationed)
					{
						console.log(location);
						//console.log(location.lat);
						//console.log(location.title);
						this.addMarker(location);
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

				this.selectedLatLng = place;

				//console.log(place.name);
				//console.log(place.geometry.location.lat());
				//console.log(place.geometry.location.lng());
				//this.selectedLat = place.geometry.location.lat();
				//this.selectedLng = place.geometry.location.lng();

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
					
					sub.next(place.geometry.location);
					//sub.complete();
				}
			});
		});
	}



	initializeMap()
	{
		let currLocation;

		console.log("In initialMap function");

		let loading = this.loadingCtrl.create(
		{
			content: 'Searching Location ...'
		});

		console.log("In initialMap function before search loading");

		loading.present();
		loading.dismiss();

		console.log("In initialMap function after search loading");

		let locationOptions = 
		{ 
			timeout: 5000,
			enableHighAccuracy: true 
		};

		console.log("In initialMap function after search loading then gettin locationOptions");

		console.log(this.geo.getCurrentPosition);

		this.geo.getCurrentPosition(locationOptions).then((position) =>
		{
			console.log("Into geolocation getCurrentPosition method");

			console.log(position.coords.latitude);
			console.log(position.coords.longitude);

			currLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			console.log(currLocation);

			console.log("Getting geolocation");
			console.log(position.coords.latitude);
			console.log(position.coords.longitude);

			let mapOptions =
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
			console.log("putting geolocation into map");

			this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

			console.log(this.map);

			console.log("After putting geolocation into map");

			this.addGeoMarker(currLocation, "Me");
			//console.log(location);	
			
		}, (err) =>
		{
			console.log("Didn't work geolocation getCurrePos method");
		});
	}

	addMarker(location)
	{
		this.fromSearchedParking = true;

		let latLng = new google.maps.LatLng(location.garage_lat, location.garage_lng);
		//console.log(location.garage_lat);
		//console.log(location.title);

		let marker = new google.maps.Marker(
		{
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: latLng
		});

		var content = document.createElement('div'), button1, button2;
		content.innerHTML = '<b>Title:</b> ' +
							location.garage_name +
							'<br>' +
							'<b>Hourly rent:</b> ' +
							location.garage_hourly_price +
							'Tk.<br>';

		button1 = content.appendChild(document.createElement('input'));
		button1.type = 'button';
		button1.value = 'Request';

		button2 = content.appendChild(document.createElement('input'));
		button2.type = 'button';
		button2.value = 'View details';

		google.maps.event.addDomListener(button1, 'click', () =>
		{
			//passing searched latitude & longitude value
			console.log("Requst has been sent");
			this.presentConfirm();
		});

		google.maps.event.addDomListener(button2, 'click', () =>
		{
			//passing searched latitude & longitude value
			console.log("Button two clicked");

			let gotPlace;


			console.log(location);

			this.navCtrl.push(PersonalInfoPage, location);
			//that.navCtrl.push(GarageRegisterPage, gotPlace);
		});

		this.markers.push(marker);
		this.addInfoWindow(marker, content);
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

	addGeoMarker(position, content)
	{
		this.fromSearchedParking = false;

		let marker = new google.maps.Marker(
		{
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: position
		});

		this.addInfoWindow(marker, content);
	}

	presentConfirm()
	{
	  	let alert = this.alertCtrl.create({
	    title: 'Confirm Request',
	    message: 'Do you want to send request?',
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: () => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Send',
	        handler: () => {
	          console.log('Buy clicked');
	          this.presentToast();
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	presentToast()
	{
		let toast = this.toastCtrl.create(
		{
		  	message: 'Request has sent to provider!',
		    duration: 3000,
		    position: 'bottom'
		});

		toast.onDidDismiss(() =>
		{
		    console.log('Dismissed toast');
		});

		toast.present();
	}
}