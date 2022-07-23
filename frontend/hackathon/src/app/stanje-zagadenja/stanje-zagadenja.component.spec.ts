import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StanjeZagadenjaComponent } from './stanje-zagadenja.component';

describe('StanjeZagadenjaComponent', () => {
  let component: StanjeZagadenjaComponent;
  let fixture: ComponentFixture<StanjeZagadenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StanjeZagadenjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StanjeZagadenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
