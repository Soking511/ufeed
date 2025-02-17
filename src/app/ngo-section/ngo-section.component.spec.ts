import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoSectionComponent } from './ngo-section.component';

describe('NgoSectionComponent', () => {
  let component: NgoSectionComponent;
  let fixture: ComponentFixture<NgoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
