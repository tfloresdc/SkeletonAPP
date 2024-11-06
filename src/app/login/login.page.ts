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

  onSubmit() {
    if (this.validateInput()) {
      this.navCtrl.navigateForward('/home', {
        state: { username: this.username }
      });
    } else {
      this.showAlert('Error', 'Datos de entrada no válidos');
    }
  }

  
  validateInput(): boolean {
    const usernameValidate = /^[a-zA-Z0-9]{3,8}$/;
    const passwordValidate = /^\d{4}$/;
    return usernameValidate.test(this.username) && passwordValidate.test(this.password);
  }

  fillTestUser() {
    this.username = this.testUser.username;
    this.password = this.testUser.password
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
