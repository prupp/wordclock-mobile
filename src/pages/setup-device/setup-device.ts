import { Component, OnInit } from '@angular/core';
import { NavController, Toast, ToastController, Refresher } from 'ionic-angular';

import { DeviceService } from '../../services/device-service';
import { WifiService } from '../../services/wifi-service';

@Component({
  selector: 'page-setup-device',
  templateUrl: 'setup-device.html'
})
export class SetupDevicePage implements OnInit {

  private deviceInfo;
  private accessPoints;

  constructor(
    private navController: NavController,
    private wifiService: WifiService,
    private toastController: ToastController,
    private deviceService: DeviceService,
  ) {

  }

  ngOnInit() {
    this.getDeviceInfo();
    this.scanAPs();
  }

  doRefresh(refresher) {
    this.scanAPs(refresher);
  }

  getDeviceInfo() {
    this.deviceService.deviceInfo().subscribe(
      data => {
        console.log('device info:', data);
        this.deviceInfo = data;
      },
      error => {
        console.log('device info error:', error);
        this.showNotification('Device Info error: ' + error);
      }
    );
  }

  scanAPs(refresher?: Refresher) {
    this.deviceService.scan().subscribe(
      data => {
        console.log('scan:', data);
        this.accessPoints = data;
      },
      error => {
        console.log('scan error:', error);
        this.showNotification('Access Point Scan Error: ' + error);
      },
      () => {
        if (refresher) {
          refresher.complete();
        }
      }
    );
  }

  private showNotification(message: string, duration: number = 3000): Toast {
    const toast = this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
    return toast;
  }

}
