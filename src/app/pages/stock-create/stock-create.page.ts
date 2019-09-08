import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service'; import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.page.html',
  styleUrls: ['./stock-create.page.scss'],
})
export class StockCreatePage implements OnInit {
  public newStockForm: FormGroup;

  constructor(
    public router: Router,
    formBuilder: FormBuilder,
    public stockService: StockService) {
    this.newStockForm = formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  createStock(newStockForm) {
    this.stockService.createStock(
      newStockForm.value.name,
      newStockForm.value.amount,
      newStockForm.value.dueDate
    )
    .then(
      () => {
        this.router.navigateByUrl('/home');
      },
      error => {
        console.log(error);
      }
    );
  }

}
