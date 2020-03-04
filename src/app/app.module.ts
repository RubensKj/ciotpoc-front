import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ExportarMdfesComponent } from './pages/exportar-mdfes/exportar-mdfes.component';
import { httpInterceptorProvider } from './services/auth/auth-interceptor.service';
import { AuthGuard } from './services/auth/auth.guard';
import { SecureInnerPagesGuard } from './services/auth/secure-inner-pages.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExportarMdfesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProvider,
    AuthGuard,
    SecureInnerPagesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
