import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SpotDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-spot-details',
  templateUrl: 'spot-details.html'
})
export class SpotDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpotDetailsPage');
  }

}
