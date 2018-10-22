import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { MenuPage } from '../menu/menu';

import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { GetUserProvider } from '../../providers/get-user/get-user';

@IonicPage()
@Component({
	selector: 'page-garage-register',
	templateUrl: 'garage-register.html',
})
export class GarageRegisterPage
{
	private registration: FormGroup;

	constructor(
		public navCtrl: NavController,
		private formBuilder: FormBuilder,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public networkConnector: NetworkEngineProvider,
		private currUser: GetUserProvider
		)
	{
		//valdators for user registration purposes
		this.registration = this.formBuilder.group(
		{
			garageTitle: [''],
			garageAddress: [''],
			hourlyRent: ['']
		});
	}

	ionViewDidLoad()
	{
		//console.log(this.navParams.get('lat'));
		console.log('ionViewDidLoad GarageRegisterPage');
	}

	garageReg(garageTitle, garageAddress, hourlyRent)
	{
		console.log("I am in garage reg");

		let curUser = this.currUser.getCurrUser();
		this.networkConnector.garageRegister(curUser, garageTitle, garageAddress, hourlyRent, this.navParams.get('lat'), this.navParams.get('lng')).then(data =>
		{
			console.log("I recieved: " + JSON.stringify(data));
			console.log("in 1");

			if (data.foo == true)
			{
				console.log(data.foo);
				this.errorAlert('Succesful!','Your garage ' + garageTitle + ' has been added.');
				this.navCtrl.setRoot(MenuPage);
			}

			else
			{
				console.log("in 3");
				console.log("eoror");
			}
		}).catch(err =>
        {
            console.log("Registration unsuccessful");
            this.errorAlert('Error!','Something went wrong with the Internet Connection. Please check your Internet.');
        });
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
