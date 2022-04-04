import { Component } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { AuthService } from '../services/auth/auth.service';
import { CitaService } from '../services/cita/cita.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor
  (
    private localNotifications: LocalNotifications,
    private auth: AuthService,
    private cita: CitaService,
    private router: Router,
  ) {

  }

  ionViewDidEnter(){
    this.cita.getCitasEstatus(this.auth.currentUserId, 'asignada').subscribe(citas => {
      console.log('cita', citas.length)
      if(citas.length>0){
        this.singleNotification(citas)
      }else{
        console.log('sin citas')
      }
    })
  }

  singleNotification(citas){
    // Schedule a single notification
    for(var i = 0; i < citas.length; i++){
      this.localNotifications.schedule([{
        id: i,
        text: 'Revisar cita para el día ' + moment(citas[i].extendedProps.currentCita.f_cita.seconds*1000).format('YYYY-MM-DD'),
        sound: 'file://sound.mp3',
        data: citas[i].extendedProps.currentCita,
      },
    ]);
    }

    this.localNotifications.on('click').subscribe(data => {
      console.log('Data',data);
      if(this.auth.isLoggedIn){
        this.goToCitas();
      }
      else{
        this.goToLogIn()
      }
    })
  }

  goToCitas(){
    this.router.navigate(['/citas-asignadas']);
    this.localNotifications.clearAll();
    //this.subscription.unsubscribe();
  }

  goToLogIn(){
    this.router.navigate(['/login']);
    this.localNotifications.clearAll();
  }

}
