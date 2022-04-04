import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CitaService } from '../services/cita/cita.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-citas-asignadas',
  templateUrl: './citas-asignadas.page.html',
  styleUrls: ['./citas-asignadas.page.scss'],
})
export class CitasAsignadasPage implements OnInit {
panelOpenState
citas;
selectedData = [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6 }];
  arrayFechas = [];
  arrayCitas = [];
  constructor(
    private auth: AuthService,
    private router: Router,
    private citaService: CitaService, public alertController: AlertController
  ) {
    console.log('Auth', this.auth.currentUserId)
    this.citaService.getCitasEstatus(this.auth.currentUserId, 'asignada').subscribe(data => {
      console.log('citas', data)
      this.citas = data;
      for(var i = 0; i < data.length; i++) {
        this.citas[i]['f_cita'] = moment(data[i]['f_cita'].seconds*1000).format('DD-MM-YYYY');
        this.arrayFechas.push(this.citas[i]['f_cita']);
        this.arrayCitas = this.arrayFechas.filter(this.onlyUnique);
      }
    })
  }

  ngOnInit() {

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async cancelar(data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<span class="title"><i class="fa-solid fa-circle-question" id="question"></i><br></span><br><h5 class="mensaje" style="color: #fff">¿Desea rechazar esta cita?</h5>',
      buttons: [
        {
          text: 'No, deseo rechazarla',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (blah) => {
            this.presentAlertCancelar(data)
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Regresar',
          cssClass: 'success',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async aceptar(data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<span class="title"><i class="fa-solid fa-circle-question" id="question"></i><br></span><br><h5 class="mensaje" style="color: #fff">¿Desea aceptar esta cita?</h5>',
      buttons: [
        {
          text: 'Regresar',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si, deseo aceptarla',
          cssClass: 'success',
          handler: () => {
            this.alertAceptada(data)
            var post = data.extendedProps.currentCita;
            post['estatus'] = 'aceptada';
            this.citaService.updateCita(post);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertAceptada(data) {
    console.log('Data', data)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<span class="title"><i class="fa-solid fa-circle-check" id="check"></i><br></span><br><h5 class="mensaje" style="color: #fff; letter-spacing: 1px;">Proceso Terminado</h5>',
      buttons: [
        {
          text: 'Continuar',
          cssClass: 'success',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCancelar(data) {
    console.log('Data', data)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<i class="fa-solid fa-circle-xmark" id="error"></i><br></span><br><h5 class="mensaje" style="color: #fff">Ingrese el motivo por el cual rechaza la cita</h5>',
      inputs: [
        {
          cssClass: 'input',
          label: 'Radio 1',
          name: 'name1',
          type: 'text',
          placeholder: 'Motivo'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          cssClass: 'success',
          handler: (alertData) => {
            console.log('Confirm Ok', alertData.name1);
            if(alertData.name1!==null){
              let dat = { motivo: alertData.name1, idUser: this.auth.currentUserId, usuario: this.auth.dataUser.userName, accion: 'Rechazo', f_rechazo: new Date()}
              data.extendedProps.currentCita.historial.push(dat);
              var post = data.extendedProps.currentCita;
              post['estatus'] = 'rechazada';
              //console.log('Data modificada', post);
              this.citaService.updateCita(post);
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
