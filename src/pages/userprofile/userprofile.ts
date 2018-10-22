import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { GetUserProvider } from '../../providers/get-user/get-user';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';

import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
	selector: 'page-userprofile',
	templateUrl: 'userprofile.html',
})
export class UserprofilePage
{

	private name;
	private contact;
	private password;
	private address;

	constructor(
		public alertCtrl: AlertController,
		public navCtrl: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		private currUser: GetUserProvider,
		private network: NetworkEngineProvider)
	{

	}

	ionViewDidLoad()
	{
		console.log('ionViewDidLoad UserprofilePage');
		this.getUser();
	}

	getUser()
	{
		//let user = this.network.getUserInfo(this.currUser.getCurrUser());

		console.log('After called getUser');

		let cUser = this.currUser.getCurrUser();

		var subscription = Observable.fromPromise
 		(
		    this.network.getUserInfo(cUser)
		);

		console.log(subscription);

		subscription.subscribe(result =>
		{
			//console.log(check.user_name);
			//console.log(result.user_name);
			let check : any;
			check = result;

			if(result == false)
			{
				console.log('In false mode');
				//this.presentConfirm("We're Sorry!",'You do not have any garage registered yet. Would you like to add one or more ?');
			}
			else
			{
				console.log("into else condition user profile");
				console.log(check.user_name);
				this.name = check.user_name;
				this.contact = check.user_mnumber;
				this.address = check.user_address;
				this.password = check.user_password;
				//this.lists = result;
			}
		});
		/*Promise.all
		([
			user
		]).then((cUser) =>
		{
			console.log('At user profile');
			let currUser;
			currUser = cUser[0][0];
			//console.log(currUser);
			console.log(currUser.user_name);
			
			this.name = currUser.user_name;
			this.contact = currUser.user_mnumber;
			this.password = currUser.password;
			this.address = currUser.user_address;

		}).catch(err =>
        {
            this.errorAlert('Error!','Something went wrong with the Internet Connection. Please check your Internet.');
        }); */
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

