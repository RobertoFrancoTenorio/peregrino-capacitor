import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocalNotifications} from '@awesome-cordova-plugins/local-notifications/ngx'
import { Badge } from '@awesome-cordova-plugins/badge/ngx';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';


@NgModule({
  declarations:
  [
    AppComponent,
  ],
  entryComponents: [],
  imports:
  [
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, BrowserAnimationsModule,

  ],
  providers:
  [
    Badge,
    CallNumber,
    LocalNotifications,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
