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
  filteredTransactions:any[] = [];
  currentSegment: string = 'all';
  headerText: string = 'Transacciones recientes';

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData() {
    this.balance = parseFloat(localStorage.getItem('balance') || '0');
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    this.segmentChanged();
  }

  segmentChanged() {
    if (this.currentSegment === 'all') {
      this.filteredTransactions = this.transactions;
      this.headerText = 'Transacciones recientes';
    } else if (this.currentSegment === 'ingreso') {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === 'ingreso');
      this.headerText = 'Ingresos recientes';
    } else {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.type === 'gasto');
      this.headerText = 'Gastos recientes';
    }
  }

  goToAddTransaction(type?: string) {
    this.navCtrl.navigateForward('/agregar', {
      queryParams: { type: type }
    }); 
  }

  addTransaction(type: string, amount: number, description: string) {
    const newTransaction = {
      type: type,
      amount: amount,
      description: description,
      date: new Date()
    };

    this.transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));

    this.balance += (type === 'ingreso' ? amount : -amount);
    localStorage.setItem('balance', this.balance.toString());
  }
}
