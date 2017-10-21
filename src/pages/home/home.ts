import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { device } from '../../data/device';
import { ConnectPage } from '../connect/connect';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  devices: Array<device> = [
    {
      icon: 'assets/img/wc-thumb.png',
      name: 'Wordclock',
      description: 'lorem ipsum dolor sit amet',
      online: true
    }
  ];

  constructor(
    private navCtrl: NavController,
  ) {

  }

  openSetupModal() {
    this.navCtrl.push(ConnectPage);
  }

}
