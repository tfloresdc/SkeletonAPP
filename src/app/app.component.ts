import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  async ngOnInit() {

  }

  async initializeApp() {
    await this.platform.ready();
    await this.storage.create();
    this.loadSettings();
  }

  async loadSettings() {
    const isDarkMode = await this.storage.get('darkMode');
    document.body.classList.toggle('dark', isDarkMode);

    const color = await this.storage.get('color');
    if (color && color !== 'default') {
      document.body.classList.add(color);
    }
  }
}