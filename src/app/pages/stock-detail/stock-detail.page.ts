import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { StockService } from '../../services/stock.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.page.html',
  styleUrls: ['./stock-detail.page.scss'],
})
export class StockDetailPage implements OnInit {
  public stock: Observable<any>;
  public stockId: string;
  public placeholderPicture = 'assets/img/debt-collector.jpg';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public stockService: StockService,
    private authService: AuthService) {

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

  async uploadPicture(): Promise<void> {
    if (this.authService.getUser().isAnonymous === true) {
      const alert = await this.alertCtrl.create({
        message:
          'If you want to continue you will need to provide an email and create a password',
        buttons: [
          { text: 'Cancel' }, {
            text: 'OK', handler: data => {
              this.router.navigate(['/signup', this.stockId]);
            },
          },
        ],
      });
      alert.present();
    } else {
      // Take the picture
      const stockPicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      //this.stockService.takeStockPhoto(this.stockId, stockPicture.base64String);
      this.stockService.takeStockPhoto(this.stockId, stockPicture.base64Data.slice(23));
    }
  }

}
