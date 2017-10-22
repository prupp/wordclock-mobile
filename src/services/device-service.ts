import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SoftAP } from 'softap-setup-ts/lib/SoftAP';

@Injectable()
export class DeviceService {

  private softAP: SoftAP;

  constructor() {
    this.softAP = new SoftAP({
      "host": "192.168.0.1",
      "keepAlive": true,
      "timeout": 20000,
      "noDelay": true,
      "channel": 6,
      "protocol": "http",
      "port": 80
    });
  }

  /**
   * Scans for nearby Access Points
   * @return {Observable<any>}
   */
  scan(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.softAP.scan((err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      })
    });
  }

  /**
   * Reads out the device information
   * @return - device id and claim status
   */
  deviceInfo(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.softAP.deviceInfo((err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      })
    });
  }

  /**
   * Reads the public key, this has to be called before calling the configure method
   * @return public key
   */
  getPublicKey(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.softAP.publicKey((err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      })
    });
  }

  /**
   * Push network configuration to the device
   * @param network 
   * @param password 
   */
  configure(network, password): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      network.password = password;
      this.softAP.configure(network, (err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      })
    });
  }

  /**
   * Connect to previously configuret AP
   */
  connect(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.softAP.connect((err, data) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data);
        }
        observer.complete();
      })
    });
  }

}
