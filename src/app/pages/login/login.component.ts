import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

// Services
import { LoginService } from './login.service';
import { TokenService } from 'src/app/services/AuthToken/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private tokenService: TokenService, private router: Router) { }

  errorMessage: String;
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }

  login() {
    this.errorMessage = '';
    let form = this.profileForm.controls;

    if (form.email.value === undefined || form.email.value === '') {
      throw this.errorMessage = 'Favor preeencher o e-mail.';
    }

    if (form.password.value === undefined || form.password.value === '') {
      throw this.errorMessage = 'Favor digitar sua senha.';
    }

    this.loginService.createTokenAuthentication(form.email.value, form.password.value).subscribe(data => {
      this.tokenService.setAuthorizationInLocalStorage(data.token);
      this.router.navigate(['']);
    }, error => {
      switch(error.status) {
        case 0: {
          this.errorMessage = 'Servidor não está disponivel no momento';
          break;
        }
        case 500: {
          this.errorMessage = 'Ocorreu algum problema no servidor';
          break;
        }
        case 401: {
          this.errorMessage = 'E-mail ou senha estão incorretos.';
          break;
        }
      }
    });
  }

}
