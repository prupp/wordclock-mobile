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
    this.wifiService.scan().then(
      data => {
        console.log('scan data:', data);
        this.networks = data;
      }
    ).catch(
      error => {
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

  private showLoading(message: string): Loading {
    const loading = this.loadingController.create({
      content: message
    });
    loading.present();
    return loading;
  }

}
