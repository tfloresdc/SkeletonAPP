import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.username = this.router.getCurrentNavigation()?.extras.state?.['username'] as string;
        this.showWelcomeMessage();
      }
    });
  }

  async showWelcomeMessage() {
    const alert = await this.alertController.create({
      header: 'Felicidades!',
      message: `Hola ${this.username}, iniciaste sesión correctamente`,
      buttons: ['Genial']
    });

    await alert.present();
  }

}