import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasAsignadasPageRoutingModule } from './citas-asignadas-routing.module';

import { CitasAsignadasPage } from './citas-asignadas.page';
import { TabsComponent } from '../components/tabs/tabs.component';
import { BackgroundComponent } from '../components/background/background.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CitasAsignadasPageRoutingModule
  ],
  declarations: [
    BackgroundComponent,
    TabsComponent,
    CitasAsignadasPage
  ]
})
export class CitasAsignadasPageModule {}
