import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { SoftAP, SoftAPOptions } from 'softap-setup-ts/lib/SoftAP';

@Injectable()
export class DeviceService {

  private softAP: SoftAP;

  constructor(private http: HttpClient) {
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
   * Scans for nearby devices
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

}
