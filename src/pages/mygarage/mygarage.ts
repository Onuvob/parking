import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { MyGarageInfoPage } from '../my-garage-info/my-garage-info';
import { AddgaragePage } from '../addgarage/addgarage';

import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { GetUserProvider } from '../../providers/get-user/get-user';

import 'rxjs/add/observable/fromPromise';
import { Observable } from "rxjs/Observable";

 @IonicPage()
 @Component({
 	selector: 'page-mygarage',
 	templateUrl: 'mygarage.html',
 })
 export class MygaragePage
 {
	private ke: MenuPage;
	public lists: any;

 	constructor(
 		public alertCtrl: AlertController,
 		public navCtrl: NavController,
 		public navParams: NavParams,
 		private network: NetworkEngineProvider,
 		private currUser: GetUserProvider
 		) 
 	{
 	}

 	ionViewDidLoad()
	{
 		console.log('ionViewDidLoad MygaragePage');
 		this.getAllMyGarages();
 	}

 	getAllMyGarages()
 	{
 		let curUser = this.currUser.getCurrUser();

 		console.log(curUser);

 		//Dont forget to update registration page after verification code get the mobile number

 		var subscription = Observable.fromPromise
 		(
		    this.network.getMyGarages(curUser)
		);

		subscription.subscribe(result =>
		{
			let check: any;

			check = result;

			console.log(check);

			if(check.foo == false)
			{
				console.log('In false mode');
				this.presentConfirm("We're Sorry!",'You do not have any garage registered yet. Would you like to add one or more ?');
			}
			else
			{
				this.lists = result;
			}
		});

 	}

 	openGarage(garageDetails)
 	{
 		//console.log(garageDetails);
 		this.navCtrl.push(MyGarageInfoPage, garageDetails)
 	}

 	presentConfirm(title, message)
 	{
		let alert = this.alertCtrl.create(
		{
		    title: title,
		    message: message,
		    buttons:
		    [{
		        text: "No, thanks!",
		        role: 'cancel',
		        handler: () =>
		        {
		          	this.navCtrl.setRoot(MenuPage);
		        }
		    },
		    {
		        text: 'Add',
		        handler: () =>
		        {
		          	this.navCtrl.setRoot(AddgaragePage);
		       	}
		    }]
		});
		alert.present();
	}

 	errorAlert(title, message)
    {
        let alert = this.alertCtrl.create(
        {
            title: title,
            message: message,
            buttons: ['Ok']
        });
        alert.present();
    }

 }