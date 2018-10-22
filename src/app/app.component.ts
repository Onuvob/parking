import { Component } from '@angular/core';
import { Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { NetworkEngineProvider } from '../providers/network-engine/network-engine';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;

  constructor(
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      public platform: Platform, 
      public events: Events,
      public network: Network,
      public networkProvider: NetworkEngineProvider
      )
  {
      this.initializeApp();
  }

  //to check the internet online or offline
  initializeApp()
  {  
      console.log("I am here before platform ready in App component");
      this.platform.ready().then(() =>
      {
          this.statusBar.styleDefault();
          this.splashScreen.hide();

          console.log("I am here after platform ready in App component");
          this.networkProvider.initializeNetworkEvents();

             // Offline event
          this.events.subscribe('network:offline', () =>
          {
              console.log("I am here after platform ready in Network offline");
              alert('network:offline ==> '+ this.network.type);    
          });

          // Online event
          this.events.subscribe('network:online', () =>
          {
              console.log("I am here after platform ready in Network online");
              alert('network:online ==> '+ this.network.type);        
          });

      });
  }
}

