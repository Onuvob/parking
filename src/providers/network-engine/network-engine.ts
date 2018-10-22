import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

export enum ConnectionStatusEnum
{
    Online,
    Offline
}

@Injectable()
export class NetworkEngineProvider
{

	previousStatus;

	constructor(
		public http: HttpClient,
		public alertCtrl: AlertController, 
        public network: Network,
        public eventCtrl: Events
		)
	{
		console.log('Hello NetworkEngineProvider Provider');
	
    	this.previousStatus = ConnectionStatusEnum.Online;
	}

	//check whether user is availabe or not
	checkUser(userNumber, userPassword): Promise<any>
	{

		let url = "http://parking-onuvobtripura101844.codeanyapp.com/userlogin.php";

		
		let param = { userNumber: userNumber, userPassword: userPassword };

		let request = this.http.post(url, param);
	
		return request.toPromise();
	}

	//get all info of user
	getUserInfo(userNumber)
	{
		let url = "http://parking-onuvobtripura101844.codeanyapp.com/getuserinfo.php";
		
		let param = { userNumber: userNumber };

		let request = this.http.post(url, param);

		//console.log(request);
	
		return request.toPromise();
	}

	//registering new user
	userReg(userName, userPassword, userNumber, userAddress, oneSignalID): Promise<any>
	{

		let url = "http://parking-onuvobtripura101844.codeanyapp.com/createuser.php";

		let param = { userName: userName, userNumber: userNumber, userPassword: userPassword, userAddress: userAddress, oneSignalID: oneSignalID};

		let request = this.http.post(url, param);

		return request.toPromise();
	}

	garageRegister(providerNumber, garageTitle, garageAddress, hourlyRent, lat, lng): Promise<any>
	{

		let url = "http://parking-onuvobtripura101844.codeanyapp.com/addgarage.php";

		let param = { providerNumber: providerNumber, garageTitle: garageTitle, garageAddress: garageAddress, hourlyRent: hourlyRent, lat: lat, lng: lng };

		let request = this.http.post(url, param);

		return request.toPromise();
	}

	getlocations()
	{
		let url = "http://parking-onuvobtripura101844.codeanyapp.com/getlocations.php";

		//let param = { garageTitle: garageTitle, garageAddress: garageAddress, hourlyRent: hourlyRent, monthlyRent: monthlyRent };

		let request = this.http.get(url);

		return request.toPromise();
	}

	getMyGarages(userNumber)
	{
		let url = "http://parking-onuvobtripura101844.codeanyapp.com/getmygarages.php";

		let param = { userNumber: userNumber };

		let request = this.http.post(url, param);

		return request.toPromise();
	}

	//to check the internet
	initializeNetworkEvents()
	{
        this.network.onDisconnect().subscribe(() =>
        {
            if (this.previousStatus === ConnectionStatusEnum.Online)
            {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });

        setTimeout(() =>
        {
            if (this.previousStatus === ConnectionStatusEnum.Offline)
            {
                this.eventCtrl.publish('network:online');    
            }

            this.previousStatus = ConnectionStatusEnum.Online;

        }, 3000);
    }

}
