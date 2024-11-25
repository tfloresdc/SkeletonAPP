import { Component, OnInit } from '@angular/core';

import { APIService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.page.html',
  styleUrls: ['./indicadores.page.scss'],
})
export class IndicadoresPage implements OnInit {
  items: any[] = [];
  isLoading: boolean = true;
  error: boolean = false;

  constructor(private apiService: APIService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadData();
  }


  loadData() {
    this.isLoading = true;
    this.error = false;

    this.apiService.getValue().subscribe(
      (data) => {
        this.items = Object.keys(data)
          .filter(key => typeof data[key] === 'object')
          .map((key) => ({
            codigo: key,
            ...data[key]
          }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los datos', error);
        this.error = true;
        this.isLoading = false;
      }
    );
  }


  refresh(event: any) {
    this.loadData();
    event.target.complete();
  }

  async newIndicatorAlert() {
    const alert = await this.alertController.create({
      header: 'Nuevo indicador',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Ingresa el código'
        },
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingresa el nombre'
        },
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Ingresa el valor'
        },
        {
          name: 'unidad_medida',
          type: 'text',
          placeholder: 'Ingresa la unidad de medida'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            this.createIndicator(data);
          }
        }
      ]
    });

    await alert.present();
  }


  createIndicator(data: any) {
    const newIndicator = {
      codigo: data.codigo,
      nombre: data.nombre,
      valor: data.valor,
      unidad_medida: data.unidad_medida,
      fecha: new Date().toISOString()
    };

    this.apiService.postValue(newIndicator).subscribe(
      (response) => {
        if (response.success) {
          this.items.unshift(newIndicator);
        }
      },
      (error) => {
        console.error('Error al crear el indicador:', error);
      }
    );
  }


  async updateIndicatorAlert(item: any) {
    const alert = await this.alertController.create({
      header: 'Editar indicador',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingresa el nombre',
          value: item.nombre
        },
        {
          name: 'valor',
          type: 'number',
          placeholder: 'Ingresa el valor',
          value: item.valor
        },
        {
          name: 'unidad_medida',
          type: 'text',
          placeholder: 'Ingresa la unidad de medida',
          value: item.unidad_medida
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            this.updateIndicator(item.codigo, data);
          }
        }
      ]
    });

    await alert.present();
  }

  updateIndicator(codigo: string, data: any) {
    const updatedIndicator = {
      codigo: codigo,
      nombre: data.nombre,
      valor: data.valor,
      unidad_medida: data.unidad_medida,
      fecha: new Date().toISOString()
    };

    this.apiService.putValue(updatedIndicator).subscribe(
      (response) => {
        if (response.success) {
          const index = this.items.findIndex(item => item.codigo === codigo);
          if (index !== -1) {
            this.items[index] = updatedIndicator;
          }
        }
      },
      (error) => {
        console.error('Error al actualizar el indicador:', error);
      }
    );
  }


  async deleteConfirmation(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar el indicador ${item.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteIndicator(item.codigo);
          }
        }
      ]
    });

    await alert.present();
  }


  deleteIndicator(codigo: string) {
    this.apiService.deleteValue(codigo).subscribe(
      (response) => {
        if (response.success) {
          this.items = this.items.filter(item => item.codigo !== codigo);
        }
      },
      (error) => {
        console.error('Error al eliminar el indicador:', error);
      }
    );
  }
}
