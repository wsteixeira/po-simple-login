import { Component, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly menus: Array<PoMenuItem> = [
    {
      icon: 'po-icon po-icon-home',
      label: 'Home',
      link: '/home',
      shortLabel: 'Home',
    },
    {
      icon: 'po-icon po-icon-users',
      label: 'Cadastro de Usuários',
      link: '/user',
      shortLabel: 'Usuários',
    },
  ];

  logo = './assets/images/po_color_font.png';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getHead().subscribe(); //Apenas para forçar o inicio da API no Heroku antes processo de login;
  }
}
