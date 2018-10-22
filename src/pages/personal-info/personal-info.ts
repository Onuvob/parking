import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage {

	
	private title;
	private lat;
	private lon;
	private hour;
	private address;

  constructor
  (public navCtrl: NavController, public navParams: NavParams)
  {
  	this.title = this.navParams.get('garage_name');
  	this.address = this.navParams.get('garage_address');
  	this.lat = this.navParams.get('garage_lat');
  	this.lon = this.navParams.get('garage_lng');
  	this.hour = this.navParams.get('garage_hourly_price');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PersonalInfoPage');
    console.log(this.navParams.get('garage_name'));
  }

}
