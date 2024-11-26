import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DBTaskService } from '../services/dbtask.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  testUser = {
    username: 'test321',
    password: '1244'
  }

  constructor(private navCtrl: NavController, private alertController: AlertController, private dbTask: DBTaskService) { }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.validateInput()) {
      const isValid = await this.dbTask.validateUser(this.username, Number(this.password));
      if (isValid) {
        await this.dbTask.saveSessionToStorage(this.username);
        this.navCtrl.navigateForward('/home', {
          state: {
            username: this.username
          }
        });
      } else {
        this.showAlert('Ocurrió un error', 'Usuario o contraseña incorrectos');
      }
    } else {
      this.showAlert('Ocurrió un error', 'Usuario o contraseña incorrectos');
    }
  }

  validateInput(): boolean {
    const usernameValidate = /^[a-zA-Z0-9]{3,8}$/;
    const passwordValidate = /^\d{4}$/;
    return usernameValidate.test(this.username) && passwordValidate.test(this.password);
  }

  fillTestUser() {
    this.username = 'test321'
    this.password = '1244'
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Entendido']
    });

    await alert.present();
  }
}
