import { Component } from '@angular/core';
import { Badge } from '@awesome-cordova-plugins/badge/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private badge: Badge,
    private device: Platform,
  ) {
    this.device.ready().then(() => {
      this.badge.set(5);
  });
  }
}
