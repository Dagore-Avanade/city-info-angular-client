import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePointOfInterestComponent } from './update-point-of-interest.component';

describe('UpdatePointOfInterestComponent', () => {
  let component: UpdatePointOfInterestComponent;
  let fixture: ComponentFixture<UpdatePointOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePointOfInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePointOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
