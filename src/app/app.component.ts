import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storage: Storage
  ) {
    this.initializeApp();
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