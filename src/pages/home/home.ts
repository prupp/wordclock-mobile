import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { device } from '../../data/device';
import { DeviceService } from '../../services/device-service/device-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  devices: Array<device> = [
    {
      icon: '/assets/img/wc-thumb.png',
      name: 'Wordclock',
      description: 'lorem ipsum dolor sit amet',
      online: true
    }
  ];

  constructor(
    public navCtrl: NavController,
    private deviceService: DeviceService,
  ) {

  }

  openSetupModal() {
    this.deviceService.scan().subscribe(
      data => {
        console.log('scan data:', data);
      },
      error => {
        console.log('scan error', error);
      }
    )
  }

}
