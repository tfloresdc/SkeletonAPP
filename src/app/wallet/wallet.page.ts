import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  balance: number = 0;
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  currentSegment: string = 'all';
  headerText: string = 'Transacciones recientes';

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const balanceString = localStorage.getItem('balance');
    const transactionString = localStorage.getItem('transactions');

    this.balance = balanceString ? parseFloat(balanceString) : 0;
    if (isNaN(this.balance)) {
      this.balance = 0;
      localStorage.setItem('balance', '0');
    }

    try {
      this.transactions = JSON.parse(transactionString || '[]');
      if (!Array.isArray(this.transactions)) {
        throw new Error('Formato de transacciones no válido');
      }
    } catch (error) {
      console.error('Error al cargar transacciones', error);
      this.transactions = [];
      localStorage.setItem('transactions', JSON.stringify([]));
    }

    this.segmentChanged();
  }

  
  segmentChanged() {
    if (this.currentSegment === 'all') {
      this.filteredTransactions = this.transactions;
      this.headerText = 'Transacciones recientes';
    } else if (this.currentSegment === 'ingreso') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === 'ingreso');
      this.headerText = 'Ingresos recientes';
    } else if (this.currentSegment === 'gasto') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === 'gasto');
      this.headerText = 'Gastos recientes';
    }
  }

  addTransaction(type: string, amount: number, description: string) {
    const newTransaction = {
      type: type,
      amount: amount,
      description: description,
      date: new Date().toISOString(),
    };

    this.transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));

    this.balance += (type === 'ingreso' ? amount : -amount);
    localStorage.setItem('balance', this.balance.toString());

  }

  goToAddTransaction(type?: string) {
    this.navCtrl.navigateForward('/agregar', {
      queryParams: { type: type}
    });
  }

}
