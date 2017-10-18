import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SoftAP, SoftAPOptions } from 'softap-setup-ts/lib/SoftAP';

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
