import { Component, OnInit } from '@angular/core';
import { HotspotNetwork } from '@ionic-native/hotspot';
import { Loading, LoadingController, ViewController } from 'ionic-angular';

import { WifiService } from '../../services/wifi-service';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit {

  private networks: HotspotNetwork[];

  constructor(
    private viewController: ViewController,
    private wifiService: WifiService,
    private loadingController: LoadingController,
  ) {

  }

  ngOnInit() {
    this.scanNetworks();
  }

  scanNetworks() {
    const loading = this.showLoading();
    this.wifiService.scan().then(
      data => {
        loading.dismiss();
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
        loading.dismiss();
        console.log('scan error', error);
      }
    );
  }

  connect(network: HotspotNetwork) {
    if (network) {
      const loading = this.showLoading('Verbinden..');

      this.wifiService.connect(network.SSID).then( data => {
        console.log('connected to', network.SSID);
        loading.dismiss();
      }).catch( err => {
        console.log('error connecting to networ:', err);
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

}
