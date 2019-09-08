import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StockService } from '../services/stock.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public stockList: Observable<any>;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private stockService: StockService,
    private router: Router) {

  }

  ngOnInit() {
    this.stockList = this.stockService.getStockList().valueChanges();
  }

  async moreStockOptions(stockId): Promise<void> {
    const action = await this.actionSheetCtrl.create({
      header: 'Modify your stock', buttons: [
        {
          text: 'Delete', role: 'destructive',
          icon: 'trash', handler: () => {
            this.stockService.removeStock(stockId); 
          }
        },
        {
          text: 'More details', icon: 'play', handler: () => {
            this.router.navigate(['/stock-detail', stockId]);
          }, 
        },
        {
          text: 'Pagar (será Editar)', icon: 'checkmark', handler: () => {
            this.stockService.updateStock(stockId);
          } 
        },
        {
          text: 'Cancelar', role: 'cancel', icon: 'close', handler: () => {
            console.log('Cancel clicked'); 
          },
        },
      ],
    });
    action.present();
  }
}
