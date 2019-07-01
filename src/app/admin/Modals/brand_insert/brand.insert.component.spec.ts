import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Brand.InsertComponent } from './brand.insert.component';

describe('Brand.InsertComponent', () => {
  let component: Brand.InsertComponent;
  let fixture: ComponentFixture<Brand.InsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Brand.InsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Brand.InsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
