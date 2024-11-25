import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  userData: any = {
    nombre: '',
    apellido: '',
    nivelEducacion: '',
    fechaNacimiento: '',
  };
  experiencia: any = {
    empresa: '',
    anoInicio: '',
    trabajaActualmente: false,
    anoTermino: '',
    cargo: ''
  };
  certificacion: any = {
    nombre: '',
    fechaObtencion: '',
    tieneVencimiento: false,
    fechaVencimiento: '',
  };

  selectedSegment: string = '';

  @ViewChild('nombreInput', {static: false}) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', {static: false}) apellidoInput!: ElementRef;

  constructor(private alertController: AlertController, private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const savedUserData = localStorage.getItem('userData');
    const savedExperiencia = localStorage.getItem('experiencia');
    const savedCertificacion = localStorage.getItem('certificacion');

    if (savedUserData) {
      this.userData = JSON.parse(savedUserData);
    }
    if (savedExperiencia) {
      this.experiencia = JSON.parse(savedExperiencia);
    }
    if (savedCertificacion) {
      this.certificacion = JSON.parse(savedCertificacion);
    }
  }

  onSubmit() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.showAlert('Datos guardados', 'Los datos personales han sido guardados correctamente');
  }

  limpiar() {
    this.userData = {
      nombre: '',
      apellido: '',
      nivelEducacion: '',
      fechaNacimiento: '',
    };
    localStorage.removeItem('userData');
    this.animateInput(this.nombreInput);
    this.animateInput(this.apellidoInput);
  }

  animateInput(inputRef: ElementRef) {
    const animation = this.animationCtrl.create()
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

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  guardarExperiencia() {
    localStorage.setItem('experiencia', JSON.stringify(this.experiencia));
    this.showAlert('Experiencia guardada', 'La experiencia laboral ha sido guardada correctamente');
  }

  guardarCertificacion() {
    localStorage.setItem('certificacion', JSON.stringify(this.certificacion));
    this.showAlert('Certificación guardada', 'La certificación ha sido guardada correctamente');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
