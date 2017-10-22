import { Injectable } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';

@Injectable()
export class WifiService {

  constructor(private hotspot: Hotspot) {
  }

  /**
   * Scans for nearby wifi networks
   * @return {Promise<HotspotNetwork[]>}
   */
  scan(): Promise<HotspotNetwork[]> {
    return this.hotspot.scanWifi();
  }

  /**
   * Connect to wifi network
   * @param {string} ssid - wifi name 
   * @param {string=''} password
   */
  connect(ssid: string, password: string = ''): Promise<any> {
    // this is a workaround for some connection issues (https://github.com/hypery2k/cordova-hotspot-plugin/issues/57)
    return this.hotspot.removeWifiNetwork(ssid).then(data => {
      return this.hotspot.connectToWifi(ssid, password);
    }).catch(erro => {
      return this.hotspot.connectToWifi(ssid, password);
    });
  }

}
