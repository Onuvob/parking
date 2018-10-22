import { Component } from '@angular/core';
import { Platform, Events, IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { ToastController, Toast } from 'ionic-angular';

import { UregPage } from '../ureg/ureg';
import { MenuPage } from '../menu/menu';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { GetUserProvider } from '../../providers/get-user/get-user';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage
{
    // private userNumber: any;
    // private password: any;
    private login: FormGroup; //formGroup uses

    splash = true; //apploading default splash icon true

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public networkConnector: NetworkEngineProvider,
        public events: Events,
        private toastCtrl: ToastController,
        public network: Network,
        public currUser: GetUserProvider
      )
    {

        //validators for login page's fields
        this.login = this.formBuilder.group(
        {
          //email: ['', Validators.compose([Validators.required, Validators.pattern(".+\@.+\..+")])]
            contact: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')])],
            password: ['', Validators.required]
        });

    }

    ionViewDidLoad()
    {
        console.log('ionViewDidLoad LoginPage');

        //time out method for apploading splash screen
        // setTimeout(() =>{
        //   this.splash = false;
        // }, 4000)
    }

    //open registration page for new users
    openUregPage()
    {
        this.navCtrl.push(UregPage);
    }

    findUser(userNumber, userPassword)
    {
        
        this.networkConnector.checkUser(userNumber, userPassword).then(data =>
        {
            console.log("I recieved: " + JSON.stringify(data));
            //console.log("in 1");

            if (data.foo == true)
            {
                console.log("login successful");
                this.currUser.setCurrUser(userNumber);
                this.navCtrl.setRoot(MenuPage);
            }
            else
            {
                //console.log("in 3");
                //console.log("eoror");

                this.errorAlert('Unsuccessful login!',"User number and password doesn't match");

                let toast : Toast;

                this.network.onDisconnect().subscribe(() =>
                {
                    console.log("oN CHECK NET");
                    toast = this.toastCtrl.create(
                    {
                           message: 'Error in login. Try again!',
                           position: 'top',
                           duration: 2000,
                           cssClass: 'failure'
                    });

                    toast.present();
                });
            }
        }).catch(err =>
        {
            console.log("login unsuccessful");
            console.log(err);
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
