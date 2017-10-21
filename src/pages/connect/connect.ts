import { SetupDevicePage } from '../setup-device/setup-device';
import { Component, OnInit } from '@angular/core';
import { HotspotNetwork } from '@ionic-native/hotspot';
import { Loading, LoadingController, NavController, Refresher, Toast, ToastController } from 'ionic-angular';

import { WifiService } from '../../services/wifi-service';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit {

  private networks: HotspotNetwork[];

  constructor(
    private navController: NavController,
    private wifiService: WifiService,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {

  }

  ngOnInit() {
    this.scanNetworks();
  }

  doRefresh(refresher) {
    this.scanNetworks(refresher);
  }

  scanNetworks(refresher?: Refresher) {
    this.wifiService.scan().then(
      data => {
        console.log('scan data:', data);
        if (data && data instanceof Array && data.length > 0) {
          this.networks = data.filter( network => {
            const ssid = network.SSID.toLowerCase();
            return ssid.startsWith('photon') || ssid.startsWith('core') || ssid.startsWith('electron');
          });
        }
      }
    ).catch(
      error => {
        console.log('scan error', error);
      }
    ).then( () => {
      // finally
      if (refresher) {
        refresher.complete();
      }
    });
  }

  connect(network: HotspotNetwork) {
    if (network) {
      const loading = this.showLoading('Verbinden..');

      this.wifiService.connect(network.SSID).then( data => {
        console.log('connected to', network.SSID);
        loading.dismiss();
        this.navController.push(SetupDevicePage);
      }).catch( err => {
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
