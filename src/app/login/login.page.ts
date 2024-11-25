import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

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

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.validateInput()) {
      this.navCtrl.navigateForward('/home', {
        state: {
          username: this.username
        }
      });
    } else {
      this.showAlert('Ocurrió un error', 'El usuario y/o contraseña son incorrectos');
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
