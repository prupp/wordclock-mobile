import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { device } from '../../data/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private devices: Array<device> = [
    {
      icon: '/assets/img/wc-thumb.png',
      name: 'Wordclock',
      description: 'lorem ipsum dolor sit amet',
      online: true
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  openSetupModal() {
    
  }

}
