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
      host: '192.168.0.1',
      keepAlive: true,
      timeout: 8000,
      noDelay: true,
      channel: 6,
      protocol: 'tcp',
      port: 5609
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

}
