import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: 'citas-asignadas',
    loadChildren: () => import('./citas-asignadas/citas-asignadas.module').then( m => m.CitasAsignadasPageModule)
  },
  {
    path: 'citas-aceptadas',
    loadChildren: () => import('./citas-aceptadas/citas-aceptadas.module').then( m => m.CitasAceptadasPageModule)
  },
  {
    path: 'consulta',
    loadChildren: () => import('./consulta/consulta.module').then( m => m.ConsultaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
