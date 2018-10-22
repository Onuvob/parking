import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MenuPageModule } from './menu.module';

import { ParkinglotsPage } from '../parkinglots/parkinglots';
import { UserprofilePage } from '../userprofile/userprofile';
import { AddgaragePage } from '../addgarage/addgarage';
import { MygaragePage } from '../mygarage/mygarage';
import { CurrentProcessPage } from '../current-process/current-process';
import { TermsPage } from '../terms/terms';

import { GetUserProvider } from '../../providers/get-user/get-user';


@IonicPage()
@Component({
	selector: 'page-menu',
	templateUrl: 'menu.html',
})
export class MenuPage
{
	@ViewChild(Nav) nav: Nav;

	rootPage: any = ParkinglotsPage;

	pages: Array<{ title: string, component: any }>;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public currUser: GetUserProvider)
	{
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
		{ title: 'Find', component: ParkinglotsPage },
		{ title: 'Add Garage', component: AddgaragePage },
		{ title: 'My Account', component: UserprofilePage },
		{ title: 'My Garages', component: MygaragePage },
		{ title: 'Current Process', component: CurrentProcessPage },
		{ title: 'Terms', component: TermsPage }
		];
	}

	ionViewDidLoad()
	{
		console.log('ionViewDidLoad MenuPage');

		//sending current user to get user provider
		//console.log(this.navParams.get('currentUser'));
	}

	initializeApp()
	{
		this.platform.ready().then(() =>
		{
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page)
	{
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
