import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorVisualizerComponent } from './color-visualizer.component';

describe('ColorVisualizerComponent', () => {
  let component: ColorVisualizerComponent;
  let fixture: ComponentFixture<ColorVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorVisualizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
