import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalnewUserComponent } from './modalnew-user.component';

describe('ModalnewUserComponent', () => {
  let component: ModalnewUserComponent;
  let fixture: ComponentFixture<ModalnewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalnewUserComponent]
    });
    fixture = TestBed.createComponent(ModalnewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
