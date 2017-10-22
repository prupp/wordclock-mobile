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
    return this.hotspot.connectToWifi(ssid, password);
  }

}
