import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EesComponent } from './ees.component';

describe('EesComponent', () => {
  let component: EesComponent;
  let fixture: ComponentFixture<EesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
