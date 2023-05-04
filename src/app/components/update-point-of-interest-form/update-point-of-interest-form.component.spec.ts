import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePointOfInterestFormComponent } from './update-point-of-interest-form.component';

describe('UpdatePointOfInterestFormComponent', () => {
  let component: UpdatePointOfInterestFormComponent;
  let fixture: ComponentFixture<UpdatePointOfInterestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePointOfInterestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePointOfInterestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
