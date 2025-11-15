import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorProductComponent } from './exterior-product.component';

describe('ExteriorProductComponent', () => {
  let component: ExteriorProductComponent;
  let fixture: ComponentFixture<ExteriorProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExteriorProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExteriorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
