import { ConnectPage } from '../connect/connect';
import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { device } from '../../data/device';
import { DeviceService } from '../../services/device-service';

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
    private navCtrl: NavController,
    private deviceService: DeviceService,
    private modalController: ModalController,
  ) {

  }

  openSetupModal() {
    const modal = this.modalController.create(ConnectPage);
    modal.present();
  }

}
