import { Injectable } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WifiService {

  constructor(private hotspot: Hotspot) {
  }

  /**
   * Scans for nearby wifi networks
   * @return {Observable<any>}
   */
  scan(): Promise<HotspotNetwork[]> {
    return this.hotspot.scanWifi();
  }

  /**
   * Connect to wifi network
   * @param {string} ssid - wifi name 
   * @param {string=''} password
   */
  connect(ssid: string, password: string = ''): Promise<void> {
    return this.hotspot.connectToWifi(ssid, password);
  }

}
