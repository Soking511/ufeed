import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalizingJOBMASTerComponent } from './digitalizing-jobmaster.component';

describe('DigitalizingJOBMASTerComponent', () => {
  let component: DigitalizingJOBMASTerComponent;
  let fixture: ComponentFixture<DigitalizingJOBMASTerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalizingJOBMASTerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalizingJOBMASTerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
