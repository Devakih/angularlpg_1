import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalessidemenuComponent } from './salessidemenu.component';

describe('SalessidemenuComponent', () => {
  let component: SalessidemenuComponent;
  let fixture: ComponentFixture<SalessidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalessidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalessidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
