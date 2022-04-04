import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CitaService } from 'src/app/services/cita/cita.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  citasAsignadas;
  citasAceptadas;
  constructor(
    private auth: AuthService,
    private router: Router,
    private citaService: CitaService
  ) { }

  ngOnInit() {
    this.citaService.getCitasEstatus(this.auth.currentUserId, 'asignada').subscribe(citas => {
      console.log('cita', citas.length)
        this.citasAsignadas = citas.length
        //this.singleNotification(citas)
    })
    this.citaService.getCitasEstatus(this.auth.currentUserId, 'aceptada').subscribe(citas => {
      console.log('citas', citas.length)
        this.citasAceptadas = citas.length
    })
  }

  goToAsignadas() {
    this.router.navigate(['citas-asignadas'])
  }

  logOut(){
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  home(){
    this.router.navigate(['/home']);
  }

  goToAceptadas(){
    this.router.navigate(['/citas-aceptadas']);
  }
}
