import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddApplicationComponent } from './dialog-add-application.component';

describe('DialogAddApplicationComponent', () => {
  let component: DialogAddApplicationComponent;
  let fixture: ComponentFixture<DialogAddApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
