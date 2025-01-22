import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GicgComponent } from './gicg.component';

describe('GicgComponent', () => {
  let component: GicgComponent;
  let fixture: ComponentFixture<GicgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GicgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GicgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
