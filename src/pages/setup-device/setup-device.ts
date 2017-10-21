import { Component, OnInit } from '@angular/core';
import {
    AlertController,
    Loading,
    LoadingController,
    NavController,
    Refresher,
    Toast,
    ToastController,
} from 'ionic-angular';

import { DeviceService } from '../../services/device-service';
import { WifiService } from '../../services/wifi-service';

@Component({
  selector: 'page-setup-device',
  templateUrl: 'setup-device.html'
})
export class SetupDevicePage implements OnInit {

  private deviceInfo;
  private networks;
  private password: string;

  constructor(
    private navController: NavController,
    private wifiService: WifiService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private deviceService: DeviceService,
  ) {

  }

  ngOnInit() {
    this.getDeviceInfo();
  }

  doRefresh(refresher) {
    setTimeout(
      this.scanAPs(refresher),
      2000);
  }

  getDeviceInfo() {
    const loading = this.showLoading('Verbinden..');

    this.deviceService.deviceInfo().subscribe(
      data => {
        console.log('device info:', data);
        this.deviceInfo = data;
        // connected to device --> get public key to start device setup (The public key must be obtained from the device before it can be successfully configured)
        this.getPublicKey();
      },
      error => {
        console.log('device info error:', error);
        this.showNotification('Device Info error: ' + error);
      },
      () => {
        loading.dismiss();
      }
    );
  }

  private getPublicKey() {
    this.deviceService.getPublicKey().subscribe(
      data => {
        console.log('public key received:', data);
        this.scanAPs();
      },
      error => {
        console.log('error getting public key:', error);
        this.showNotification('Public Key error: ' + error);
      }
    );
  }

  private scanAPs(refresher?: Refresher) {
    this.deviceService.scan().subscribe(
      data => {
        console.log('scan:', data);
        this.networks = data;
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

  enterPassword(network) {
    let prompt = this.alertController.create({
      title: 'Login',
      message: 'Bitte Passwort für das Netzwerk ' + network.ssid + ' eingeben:',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.connect(network, data.password);
          }
        }
      ]
    });
    prompt.present();
  }

  private connect(network, password) {
    if (network) {
      const loading = this.showLoading('Verbinden..');

      this.deviceService.configure(network, password).subscribe(data => {
        console.log('connected to', network.ssid);
        loading.dismiss();
        this.deviceService.connect().subscribe(() => {
          this.navController.popToRoot();
        });
      }, err => {
        console.log('error connecting to network:', err);
        this.showNotification('Verbindung konnte nicht hergestellt werden: ' + err);
        loading.dismiss();
      });
    }
  }

  private showLoading(message?: string): Loading {
    const loading = this.loadingController.create({
      content: message
    });
    loading.present();
    return loading;
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
