import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLinkUserComponent } from './dialog-link-user.component';

describe('DialogLinkUserComponent', () => {
  let component: DialogLinkUserComponent;
  let fixture: ComponentFixture<DialogLinkUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLinkUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLinkUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
