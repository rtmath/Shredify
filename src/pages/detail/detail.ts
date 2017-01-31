import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  spot:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.spot = navParams.get('spot');
  }



}
