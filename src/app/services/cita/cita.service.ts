import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
  ) { }

  getCitasEstatus(id: string, estatus: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('detDoctor.id', '==', id).where('estatus', '==', estatus).orderBy('f_cita', 'asc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          var color = ' '
          var background = ' '
          const data = a.payload.doc.data()
          let evento = {};
          evento = {
            title: data['detPaciente'].nombre,
            start: data['cita_hora_ini']+':00',
            end: data['cita_hora_fin']+':00',
            estatus: data['estatus'],
            f_cita: data['f_cita'],
            extendedProps: {
              tipoEvento: 'Cita',
              currentCita: data,
            }
          }
          return evento
        }))
      )
  }

  updateCita(post: any) {
    console.log('POST', post)
    return new Promise<void>((resolve) => {
      this.afs.doc('SegMedico/peregrino/citas/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }
}
