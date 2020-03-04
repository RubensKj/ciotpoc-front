import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ExportarMdfesComponent } from './pages/exportar-mdfes/exportar-mdfes.component';

// Guards
import { AuthGuard } from './services/auth/auth.guard';
import { SecureInnerPagesGuard } from './services/auth/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: ExportarMdfesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
