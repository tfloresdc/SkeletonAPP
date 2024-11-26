import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { DBTaskService } from '../services/dbtask.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userData = {
    username: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: '',
    nivelEducacion: '',
    fechaNacimiento: '',
  };

  constructor(private navCtrl: NavController, private alertController: AlertController, private dbTask: DBTaskService) { }

  ngOnInit() {
  }


  async onSubmit() {
    if(this.validateInput()) {
      await this.dbTask.registerSession(this.userData.username, Number(this.userData.password));

      await this.showAlert('Registro exitoso', 'Tu cuenta ha sido creada exitosamente');
      this.navCtrl.navigateForward('/login');
    } else {
      this.showAlert('Error en el registro', 'Por favor, verifica los datos ingresados');
    }
  }

  validateInput(): boolean {
    
    const usernameValidate = /^[a-zA-Z0-9]{3,8}$/;
    const passwordValidate = /^\d{4}$/;
    return (
      usernameValidate.test(this.userData.username) &&
      passwordValidate.test(this.userData.password) &&
      this.userData.password === this.userData.confirmPassword &&
      this.userData.nombre.trim() !== '' &&
      this.userData.apellido.trim() !== '' &&
      this.userData.nivelEducacion !== '' &&
      this.userData.fechaNacimiento !== ''
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Entiendo']
    });

    await alert.present();
  }

}
