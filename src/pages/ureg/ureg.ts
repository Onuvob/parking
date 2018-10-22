import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { MenuPage } from '../menu/menu';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { GetUserProvider } from '../../providers/get-user/get-user';

@IonicPage()
@Component({
    selector: 'page-ureg',
    templateUrl: 'ureg.html',
})
export class UregPage
{

    private registration: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public networkConnector: NetworkEngineProvider,
        private currUser: GetUserProvider
      )
    {
        //valdators for user registration purposes
        this.registration = this.formBuilder.group(
        {
            name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
            //email: ['', Validators.compose([Validators.required, Validators.pattern(".+\@.+\..+")])],
            password: ['', Validators.required],
            contact: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')])],
            address: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])]
        });

    }

    ionViewDidLoad()
    {
        console.log('ionViewDidLoad UregPage');
    }

    /* pick images from gallery */
    //code haven't ready yet

    /* open menu page */
    //open menu page after succesfull registration
    openMenuPage(userNumber)
    {
        let user =
        {
            currentUser : userNumber
        }
        
        this.currUser.setCurrUser(userNumber);

        this.navCtrl.setRoot(MenuPage, user);
    }


    userReg(userName, userPassword, userNumber, userAddress)
    {

        let oneSignalID = "default";

        this.networkConnector.userReg(userName, userPassword, userNumber, userAddress, oneSignalID).then(data =>
        {
            //console.log("I recieved: " + JSON.stringify(data));
            console.log("in 1");

            if (data.foo == true)
            {
                console.log(data.foo);
                this.openMenuPage(userNumber);
            }
            else
            {
                console.log("in 3");
                console.log("eoror");
                this.errorAlert('Registration failed!', 'You can not register many times using same number.');
            }
        }).catch(err =>
        {
            console.log("login unsuccessful");
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
