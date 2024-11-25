import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  selectedColor: string = 'default';
  isDarkMode: boolean = false;
  notificationsEnabled: boolean = false;
  backupFrequency: string = 'weekly';

  availableColors = [
    { name: 'Predeterminado', value: 'default' },
    { name: 'Rojo', value: 'red' },
    { name: 'Verde', value: 'green' },
    { name: 'Azul', value: 'blue' },
    { name: 'Amarillo', value: 'yellow' },
    { name: 'Rosado', value: 'pink' },
    { name: 'Naranja', value: 'orange' },
    { name: 'Morado', value: 'purple' },
  ];

  constructor(private storage: Storage, private platform: Platform) { }

  async ngOnInit() {
    await this.storage.create();
    await this.loadSettings();
  }

  async loadSettings() {
    this.selectedColor = (await this.storage.get('color')) || 'default';
    this.isDarkMode = (await this.storage.get('darkMode')) || false;
    this.notificationsEnabled = (await this.storage.get('notifications')) || false;
    this.backupFrequency = (await this.storage.get('backupFrequency')) || 'weekly';
    this.applySettings();
  }

  applySettings() {
    this.changeColor();
    this.toggleDarkMode();
  }

  async changeColor() {
    document.body.classList.remove('red', 'green', 'blue', 'yellow', 'pink', 'orange', 'purple');
    if (this.selectedColor !== 'default') {
      document.body.classList.add(this.selectedColor);
    }
    await this.storage.set('color', this.selectedColor);
  }

  async toggleDarkMode() {
    document.body.classList.toggle('dark', this.isDarkMode);
    await this.storage.set('darkMode', this.isDarkMode);
  }

  async toggleNotifications() {
    await this.storage.set('notifications', this.notificationsEnabled);
  }

  async changeBackupFrequency() {
    await this.storage.set('backupFrequency', this.backupFrequency);
  }

  async exportData() {
    console.log('Exportando datos...');
  }
}