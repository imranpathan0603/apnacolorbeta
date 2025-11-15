import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductCartComponent } from './customer-product-cart.component';

describe('CustomerProductCartComponent', () => {
  let component: CustomerProductCartComponent;
  let fixture: ComponentFixture<CustomerProductCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProductCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
