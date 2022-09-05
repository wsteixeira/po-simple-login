import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PoLanguage, PoNotificationService } from '@po-ui/ng-components';
import {
  PoPageLogin,
  PoPageLoginAuthenticationType,
} from '@po-ui/ng-templates';
import { AuthService } from 'src/app/guard/auth.service';

import { LoginService } from './login.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy, OnInit {
  readonly languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Português' },
  ];

  logo = './assets/images/po_color_bg.png';

  // true - Login usando o serviço do template
  // false - Login Login usando o serviço local
  // Você pode usuar no formato mais adequado a sua necessidade
  loginTamlateService = true;

  // Login usando o serviço do template
  authenticationUrl!: string;
  authenticationType = PoPageLoginAuthenticationType.Bearer;

  // Login usando o serviço local
  loginErrors: Array<string> = [];
  passwordErrors: Array<string> = [];

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationUrl = this.loginService.getEndpoint();
    this.authService.logout();
    this.poNotification.information(
      'Você pode usar - [Login: admin] / [Senha: admin]'
    );
  }

  ngOnDestroy() {
    const userAuth: any = JSON.parse(
      sessionStorage.getItem('PO_USER_LOGIN') || '{}'
    );
    if (userAuth?.user) {
      this.authService.login(userAuth.user);
    }
    sessionStorage.removeItem('PO_USER_LOGIN');
  }

  // As funções abaixo são apenas para o login usando o serviço local
  checkLogin(formData: PoPageLogin) {
    this.loginService
      .login({
        login: formData.login,
        password: Buffer.from(formData.password).toString('base64'), // encode
      })
      .subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this),
      });
  }

  loginChange() {
    this.loginErrors = [];
  }

  passwordChange() {
    this.passwordErrors = [];
  }

  private handleResponse(response: any) {
    sessionStorage.setItem('PO_USER_LOGIN', JSON.stringify(response));
    this.router.navigate(['/']);
  }

  private handleError(error: any) {
    this.loginErrors = error.error.loginWarnings;
    this.passwordErrors = error.error.passwordWarnings;
  }
}
