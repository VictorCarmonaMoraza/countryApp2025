import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInformation } from './country-information';

describe('CountryInformation', () => {
  let component: CountryInformation;
  let fixture: ComponentFixture<CountryInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
