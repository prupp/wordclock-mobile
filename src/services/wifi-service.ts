import { Injectable } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';

declare let WifiWizard: any;

@Injectable()
export class WifiService {

  constructor(private hotspot: Hotspot) {
  }

  /**
   * Scans for nearby wifi networks
   * @return {Promise<HotspotNetwork[]>}
   */
  scan(): Promise<any> {
    if (WifiWizard) {
      return new Promise((resolve, reject) => {
        WifiWizard.startScan(data => {
          setTimeout(
            WifiWizard.getScanResults(data => {
              resolve(data);
            }, error => {
              reject(error);
            }),
            3000);
        }, error => {
          reject(error);
        });
      });
    } else {
      // use hotspot plugin as fallback if WifiWizard isn't available
      return this.hotspot.scanWifi();
    }
  }

  /**
   * Connect to wifi network
   * @param {string} ssid - wifi name 
   * @param {string=''} password
   */
  connect(ssid: string, password: string = ''): Promise<any> {
    if (WifiWizard) {
      return new Promise((resolve, reject) => {
        WifiWizard.connectNetwork(ssid, data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
    } else {
      // use hotspot plugin as fallback if WifiWizard isn't available
      return this.hotspot.connectToWifi(ssid, password);
    }
  }

}
