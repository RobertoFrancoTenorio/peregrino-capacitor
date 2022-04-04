import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasAceptadasPageRoutingModule } from './citas-aceptadas-routing.module';

import { CitasAceptadasPage } from './citas-aceptadas.page';
import { TabsComponent } from '../components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasAceptadasPageRoutingModule
  ],
  declarations: [CitasAceptadasPage, TabsComponent]
})
export class CitasAceptadasPageModule {}
