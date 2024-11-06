import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username: string = '';
  userData = {
    nombre: '',
    apellido: '',
    nivelEducacion: '',
    fechaNacimiento: ''
  };

  @ViewChild('nombreInput', {static: false}) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', {static: false}) apellidoInput!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController, private animationCtrl: AnimationController) {}

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
      header: '¡Bienvenido!',
      message: `Hola ${this.username}, iniciaste sesión correctamente`,
      buttons: ['Muy bien']
    });

    await alert.present();
  }

  limpiar() {
    this.userData = {
      nombre: '',
      apellido: '',
      nivelEducacion: '',
      fechaNacimiento: ''
    };
    this.animateInput(this.nombreInput);
    this.animateInput(this.apellidoInput);
  }

  async mostrar() {
    const alert = await this.alertController.create({
      header: 'Información del usuario',
      message: `Nombre: ${this.userData.nombre} - Apellido: ${this.userData.apellido}`,
      buttons: ['OK']
    });
    await alert.present();
  }

  animateInput(inputRef: ElementRef) {
    const animation: Animation = this.animationCtrl.create()
      .addElement(inputRef.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 0.5, transform: 'translateX(100px)' },
        { offset: 1, transform: 'translateX(0px)' }
      ]);

    inputRef.nativeElement.classList.add('animated');

    animation.play().then(() => {
      inputRef.nativeElement.classList.remove('animated');
    });
  }

  onSubmit() {
    console.log('Formulario enviado', this.userData);
  }

  customPickerOptions = {
    buttons: [{
      text: 'Cancelar',
      role: 'cancel'
    }, {
      text: 'Aceptar',
      handler: () => {
        console.log('Fecha seleccionada');
      }
    }]
  };
  
}