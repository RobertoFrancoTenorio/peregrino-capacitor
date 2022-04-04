import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { CitaService } from '../services/cita/cita.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import * as moment from 'moment';
import { PacienteService } from '../services/paciente/paciente.service';

@Component({
  selector: 'app-citas-aceptadas',
  templateUrl: './citas-aceptadas.page.html',
  styleUrls: ['./citas-aceptadas.page.scss'],
})
export class CitasAceptadasPage implements OnInit {
  panelOpenState
  citas;
  arrayFechas = [];
  arrayCitas = [];
  currentPaciente: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private citaService: CitaService,
    public alertController: AlertController,
    private callNumber: CallNumber,
    private platform: Platform,
    private paciente: PacienteService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // statusBar.styleDefault();
      console.log('id', this.auth.currentUserId)
      this.citaService.getCitasEstatus('3OTornDjlxRGTOlFjn7wTMWGoVz1', 'aceptada').subscribe(data => {
        console.log('citas', data)
        this.citas = data;
        for(var i = 0; i < data.length; i++) {
          this.paciente.getPacienteData(this.citas[i].extendedProps.currentCita.detPaciente.id).subscribe(data =>{
            this.currentPaciente = data;
          })
          this.citas[i]['f_cita'] = moment(data[i]['f_cita'].seconds*1000).format('DD-MM-YYYY');
          this.arrayFechas.push(this.citas[i]['f_cita']);
          this.arrayCitas = this.arrayFechas.filter(this.onlyUnique);
        }
      })
    });

}

  ngOnInit() {

  }

  realizaLlamada(celular, data){
    this.callNumber.callNumber(celular, true)
    this.aceptar(data)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  async aceptar(data) {
    console.log('Data', data   )
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<span class="title"><i class="fa-solid fa-circle-question" id="question"></i><br></span><br><h5 class="mensaje" style="color: #fff">¿Obtuvo respuesta?</h5>',
      buttons: [
        {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.goToConsulta(data)
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.alertReagendar(data)
          }
        },
      ]
    });
    await alert.present();
  }

  async alertReagendar(cita) {
    console.log('Data', cita)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<span class="title"><i class="fa-solid fa-circle-check" id="check"></i><br></span><br><h5 class="mensaje" style="color: #fff; letter-spacing: 1px;">La cita será reagendada por una asistente</h5>',
      buttons: [
        {
          text: 'Continuar',
          cssClass: 'success',
          handler: () => {
            let data = { motivo: 'No se obtuvo respuesta', idUser: this.auth.currentUserId, usuario: this.auth.dataUser.userName, accion: 'Reagendar', f_termino: new Date()}
            cita.extendedProps.currentCita.estatus = 'reagendar'
            cita.extendedProps.currentCita.historial.push(data);
            this.citaService.updateCita(cita.extendedProps.currentCita);
            this.router.navigate(['home']);
          }
        }
      ]
    });
    await alert.present();
  }

  goToConsulta(data: any){
    const navigationExtras: NavigationExtras = {
      state: {
        infoCita: data,
        paciente: this.currentPaciente
      }
    };
    this.router.navigate(['consulta'], navigationExtras);
  }
}
