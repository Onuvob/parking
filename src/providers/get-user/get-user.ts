import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MenuPage } from '../../pages/menu/menu';


@Injectable()
export class GetUserProvider {

	private currUser: string;
  constructor(
  	public http: HttpClient
  	)
  {
    	console.log('Hello GetUserProvider Provider');
  }

  setCurrUser(currUser)
  {
  		this.currUser = currUser;
  		//console.log('After reaching at USER');
  		//console.log(currUser);
  		console.log(this.currUser);
  		//console.log('01515');
  }

  getCurrUser()
  {
  		return this.currUser;
  }

}
