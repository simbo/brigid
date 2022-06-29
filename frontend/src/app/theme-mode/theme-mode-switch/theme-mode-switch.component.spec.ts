import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { getMockState } from 'src/test/app.state.initial-test.spec';

import { ThemeModeSwitchComponent } from './theme-mode-switch.component';

describe('ThemeSwitchComponent', () => {
  let component: ThemeModeSwitchComponent;
  let fixture: ComponentFixture<ThemeModeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore(getMockState())],
      declarations: [ThemeModeSwitchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeModeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
