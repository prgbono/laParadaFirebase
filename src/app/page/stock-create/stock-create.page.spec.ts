import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreatePage } from './stock-create.page';

describe('StockCreatePage', () => {
  let component: StockCreatePage;
  let fixture: ComponentFixture<StockCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
