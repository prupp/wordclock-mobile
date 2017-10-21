import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Hotspot } from '@ionic-native/hotspot';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ConnectPage } from '../pages/connect/connect';
import { HomePage } from '../pages/home/home';
import { SetupDevicePage } from '../pages/setup-device/setup-device';
import { DeviceService } from '../services/device-service';
import { WifiService } from '../services/wifi-service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConnectPage,
    SetupDevicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConnectPage,
    SetupDevicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceService,
    WifiService,
    Hotspot
  ]
})
export class AppModule {}
