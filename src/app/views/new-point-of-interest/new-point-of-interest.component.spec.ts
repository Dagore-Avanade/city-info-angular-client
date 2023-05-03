import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPointOfInterestComponent } from './new-point-of-interest.component';

describe('NewPointOfInterestComponent', () => {
  let component: NewPointOfInterestComponent;
  let fixture: ComponentFixture<NewPointOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPointOfInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPointOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
