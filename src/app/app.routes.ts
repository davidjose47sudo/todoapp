import { Routes } from '@angular/router';

import {HomeComponent} from '../app/pages/home/home.component';
import {LaboratorioComponent} from '../app/pages/laboratorio/laboratorio.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'laboratorio', component: LaboratorioComponent },
  { path: 'pending', component: PendientesComponent },
  { path: 'completed', component: LaboratorioComponent },
  { path: '**', redirectTo: 'home' }
];
