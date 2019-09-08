import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { StockService } from '../../services/stock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.page.html',
  styleUrls: ['./stock-detail.page.scss'],
})
export class StockDetailPage implements OnInit {
  public stock: Observable<any>;
  public stockId: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public stockService: StockService) {

  }

  ngOnInit() {
    this.stockId = this.route.snapshot.paramMap.get('id');
    this.stock = this.stockService.getStock(this.stockId).valueChanges();
  }

  async showOptions(): Promise<void> {
    const action = await this.actionCtrl.create({
      header: 'Modify your stock', buttons: [
        {
          text: 'Delete',
          role: 'destructive', icon: 'trash', handler: () => {
            this.stockService.removeStock(this.stockId).then(() => {
              this.router.navigateByUrl('home');
            });
          },
        }, {
          text: 'Mark as Paid!', icon: 'checkmark', handler: () => {
            this.stockService.updateStock(this.stockId);
          },
        },
        {
          text: 'Cancelar', role: 'cancel', icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    action.present();
  }

}
