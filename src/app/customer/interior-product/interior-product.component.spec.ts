import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteriorProductComponent } from './interior-product.component';

describe('InteriorProductComponent', () => {
  let component: InteriorProductComponent;
  let fixture: ComponentFixture<InteriorProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteriorProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteriorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
